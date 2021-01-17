const getErrorMsg = (message: string): string => {
    switch (message) {
        case 'wrong_email_or_password':
            return 'Неверный логин или пароль'
        case 'Network Error':
            return 'Сервер недоступен'
        default:
            return 'Неизвесная ошибка'
    }
}

export default getErrorMsg