export declare enum TargetType {
    SHARE_FACEBOOK = "share_facebook",
    SHARE_TELEGRAM = "share_telegram",
    SHARE_TWITTER = "share_twitter",
    SHARE_ODNOKLASSNIKI = "share_odnoklassniki",
    COPY_BUTTON = "copy_button",
    COPY_INPUT = "copy_input"
}
declare let sendTarget: (event: TargetType) => void;
export { sendTarget };
