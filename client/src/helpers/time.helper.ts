export const convertTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        time %= 60;

        const seconds = time;

        let result = minutes ? `${minutes}m:` : "";
        result += seconds ? `${seconds}s` : "0s";

        return result;
};
