interface FakeDataType {
        lettersAndNumbers: string;
        lettersAndNumbersLowerCase: string;
        letters: string;
        number: string;
}

const fakePattern: FakeDataType = {
        lettersAndNumbers: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        lettersAndNumbersLowerCase: 'abcdefghijklmnopqrstuvwxyz0123456789',
        letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
};

export function fakeData(length: number, type: keyof FakeDataType = 'lettersAndNumbers') {
        var result = '';
        var characters = fakePattern[type];
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
}
