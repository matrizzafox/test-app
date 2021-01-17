import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { Button, Container, Dimmer, Form, Loader, Message, Segment } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { LoginFormStateType, UserStateType, UserStatusTypes } from '../../helpers/types'
import { fetchAuthUser } from '../../store/actions/user'

yup.setLocale({
    mixed: { required: 'Это поле является обязательным' },
    string: { email: 'Вы ввели неверный E-Mail' }
})

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

const Auth: React.FC = (): React.ReactElement => {

    const dispatch = useDispatch()
    const { status, error: authError } = useSelector(({ User }: { User: UserStateType }) => User)

    const { register, handleSubmit, errors } = useForm<LoginFormStateType>({ resolver: yupResolver(schema) })

    const handleFormSubmit: SubmitHandler<LoginFormStateType> = React.useCallback((fields) => {
        dispatch(fetchAuthUser(fields))
    }, [dispatch])

    switch (status) {
        case UserStatusTypes.NEVER:
            return <Loader active size='massive' />
        case UserStatusTypes.AUTH:
            return <Redirect to='/profile' />
        default:
            break;
    }

    return (
        <Container text>
            <Segment>
                <Form warning={errors.email || errors.password ? true : false} onSubmit={handleSubmit(handleFormSubmit)}>
                    <Form.Field error={errors.email ? true : false}>
                        <label>Почта</label>
                        <input ref={register} type='text' name="email" placeholder='Введите почту' required />
                        {errors.email &&
                            <Message
                                warning
                                header='Внимание'
                                content={errors.email.message}
                            />}
                    </Form.Field>
                    <Form.Field error={errors.password ? true : false}>
                        <label>Пароль</label>
                        <input ref={register} type='password' name="password" placeholder='Введите пароль' required />
                        {errors.password &&
                            <Message
                                warning
                                header='Внимание'
                                content={errors.password.message}
                            />}
                    </Form.Field>
                    <Button type='submit'>Войти</Button>
                </Form>
                <Dimmer active={status === UserStatusTypes.LOADING} inverted>
                    <Loader inverted />
                </Dimmer>
            </Segment>
            {authError &&
                <Message negative>
                    <Message.Header>Произошла ошибка</Message.Header>
                    <p> {authError} </p>
                </Message>}
        </Container>

    )
}

export default Auth
