class LoginModel {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }
    isValid() {
        if (!this.email || !this.password) {
            return false;
        }
        if (!this.validateEmail(this.email)) {
            return false;
        }
        return true;
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
module.exports = LoginModel;
