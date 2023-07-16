export class ChatMessageDto {
    constructor(user, message) {
        this.message = message;
        this.user = user;
    }
}