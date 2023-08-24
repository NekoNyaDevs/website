const latest = 'v1';
const outdated = [];
const supported = ['v1'];

/* V1 Infos */

const v1Endpoints = {
    0: 'GET        /api/v1/random/<neko, kitsune, lewd, hug, kiss, pat, slap>',
    1: 'GET        /api/v1/8ball?cute=<true, false>',
    2: 'GET        /api/v1/owoify?text=<text>'
};

const v1EightballAnswers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes, definitely",
    "You may rely on it",

    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",

    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",

    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

const v1CuteEightballAnswers = [
    "Yes!!",
    "Of Cwurse!",
    "Yes, definitelwy nya!",
    "Without any doubts nya!",
    "My tail says yess!",

    "Mhh.. I think so!",
    "Most likely!",
    "Outwook good!",
    "Yesh!",
    "Signs point to yes!",

    "I don't know nya..",
    "Ask again later, nya!",
    "Better not twell you now!",
    "Cannot predict now..",
    "Concentrate and ask again! :3",

    "Don't count on it! >:c",
    ">-< My reply is nyo!",
    "My sources say nyo!",
    "Outlook nyot so good! :c",
    "Very doubtfwul!"
];

module.exports = {
    latest,
    outdated,
    supported,
    v1: {
        endpoints: v1Endpoints,
        eightballAnswers: {
            normal: v1EightballAnswers,
            cute: v1CuteEightballAnswers
        }
    }
};