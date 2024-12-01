export function random (len : number) {
    let options ="qwertyuiopasdfghjklzxcvbnm123456789";
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans = ans + options[Math.floor((Math.random()) * options.length)]
    }
    return ans;
}