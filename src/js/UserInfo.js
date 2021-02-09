export class UserInfo {
    constructor(userName, userAbout, userAvatar) {
        this.name = ''
        this.job = ''
        this.avatar = ''
        this.userName = userName
        this.userAbout = userAbout
        this.userAvatar = userAvatar
    }
    setUserInfo(name, job, avatar) {
        this.name = name
        this.job = job
        this.avatar = avatar
    }
    updateUserInfo() {
        this.userName.textContent = this.name;
        this.userAbout.textContent = this.job;
        this.userAvatar.style.backgroundImage = `url(${this.avatar})`;

    }
}
