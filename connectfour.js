document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container')
    const board = document.getElementById('board')
    const input = document.getElementById("input")
    let turn = "red"
    let wait = 0
    var presentWeight = Math.ceil(42 * 0.26) + 10
    var preteritWeight = Math.ceil(42 * 0.16)
    var perfectWeight = Math.ceil(42 * 0.22) + 10
    var pluperfectWeight = Math.ceil(42 * 0.10)
    var futureWeight = Math.ceil(42 * 0.16)
    var futurePerfectWeight = Math.ceil(42 * 0.10)
    let randTenses = []

    const irregs = {
        sein : {
            präsens : {
                firstSg : "bin",    firstPl : "sind",
                secondSg: "bist",   secondPl: "seid",
                thirdSg: "ist",    thirdPl : "sind",
            },
            präteritum : {
                firstSg : "war",    firstPl : "waren",
                secondSg: "warst",  secondPl: "wart",
                thirdSg: "war",     thirdPl : "waren"
            }
        },
        haben : {
            präsens : {
                firstSg : "habe",   firstPl : "haben",
                secondSg: "hast",   secondPl: "habt",
                thirdSg: "hat",     thirdPl : "haben",
            },
            präteritum : {
                firstSg : "hatte",      firstPl : "hatten",
                secondSg: "hattest",    secondPl: "hattet",
                thirdSg: "hatte",       thirdPl : "hatten",
            }
        },
        werden : {
            präsens : {
                firstSg : "werde",  firstPl : "werden",
                secondSg: "wirst",  secondPl: "werdet",
                thirdSg: "wird",    thirdPl : "werden",
            },
            präteritum : {
                firstSg : "wurde",      firstPl : "wurden",
                secondSg: "wurdest",    secondPl: "wurdet",
                thirdSg: "wurde",       thirdPl : "wurden",
            }
        },
        tun : {präteritum : {secondSg: "tatest,tatst" }},
        entscheiden : {präteritum : {secondSg: "entschiedest,entschiedst"}},
        verstanden : {präteritum : {secondSg: "verstandest,verstandst"}},
        finden : {präteritum : {secondSg: "fandest,fandst"}},
        sitzen : {präteritum : {secondSg: "saßest,saßt"}},
        heißen : {präteritum: {secondSg: "hießest,hießt"}},
        fragen : {
            präsens : {
                secondSg: "fragst,frägst",
                thirdSg: "fragt,frägt"
            },
            präteritum: {
                firstSg : "fragte,frug",   firstPl : "fragten,frugen",
                secondSg: "fragtest,frugst", secondPl: "fragtet,frugt",
                thirdSg : "fragte,frug",   thirdPl : "fragten,frugen"
            }
        },
        reden : {präsens : {secondPl: "redet"}},
        kosten : {präsens : {secondPl: "kostet"}},
        verbessern : {präsens : {firstSg: "verbessre,verbessere,verbesser"}},
        lächeln : {präsens : {firstSg : "lächle,lächele,lächel"}},
        arbeiten : {präsens : {secondPl : "arbeitet"}},
        schalten : {präsens : {secondPl : "schaltet"}}
    }

    const german = {}

    function randomize(square, verb){
        if (verb === undefined) w = Object.keys(verbs_list)[Math.floor(Math.random() * Object.keys(verbs_list).length)]
        t = randomTense()
        p = Object.keys(person)[Math.floor(Math.random() * Object.keys(person).length)]
        if (dissallowed.some(v => (w + " " + t).includes(v))) {
            randomize(square, w)
        } else {
            square.innerHTML = verbs_list[w].verb + "<br /><br />" + tense[t]
            square.dataset.verb = w
            square.dataset.tense = t
            square.dataset.person = p
        }
    }

    function randomTenseArray() {
        for (presentWeight > 0; presentWeight--;) {
            randTenses.push('präsens')
        }
        for (preteritWeight > 0; preteritWeight--;) {
            randTenses.push('präteritum')
        }
        for (perfectWeight > 0; perfectWeight--;) {
            randTenses.push('perfekt')
        }
        for (pluperfectWeight > 0; pluperfectWeight--;) {
            randTenses.push('plusquamperfekt')
        }
        for (futureWeight > 0; futureWeight--;) {
            randTenses.push('futurI')
        }
        for (futurePerfectWeight > 0; futurePerfectWeight--;) {
            randTenses.push('futurII')
        }
    }

    function randomTense() {
        index = (Math.floor(Math.random() * randTenses.length))
        t = randTenses[index]
        randTenses.splice(index, 1)
        return t
    }

    function create_board (container) {
        randomTenseArray()
        for (i = 0; i < 42; i++) {
            square = document.createElement("div")
            container.appendChild(square)
            square.id = i
            randomize(square)
            if (Math.floor(i / 7) === 5) {
                square.classList.add('reveal')
            }
            square.onmouseover = function(){highlight_bottom()}
            square.onmouseout = function(){unhighlight_bottom()}
        }
    }

    function highlight_bottom() {
        if (wait === 0){
            tarList = document.querySelectorAll(":hover")
            tar = tarList[tarList.length-1]
            tarId = parseInt(tar.id)
            if (tar.classList.contains('reveal')) {
                tar.classList.toggle(turn + 'ish')
            } else {
                tar = document.getElementById(tarId+7)
                if (tar.classList.contains('reveal')) {
                    tar.classList.toggle(turn + 'ish')
                } else {
                    tar = document.getElementById(tarId+14)
                    if (tar.classList.contains('reveal')) {
                        tar.classList.toggle(turn + 'ish')
                    } else {
                        tar = document.getElementById(tarId+21)
                        if (tar.classList.contains('reveal')) {
                            tar.classList.toggle(turn + 'ish')
                        } else {
                            tar = document.getElementById(tarId+28)
                            if (tar.classList.contains('reveal')) {
                                tar.classList.toggle(turn + 'ish')
                            } else {
                                tar = document.getElementById(tarId+35)
                                if (tar.classList.contains('reveal')) {
                                    tar.classList.toggle(turn + 'ish')
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function unhighlight_bottom() {
        if (wait === 0) {
            tar = get_tar("." + turn + "ish")
            try {
                tar.classList.toggle(turn + 'ish')
            } catch (e) {}
        }
    }

    function get_tar(string) {
        tarList = document.querySelectorAll(string)
        return tarList[tarList.length - 1]
    }

    const verbs_list = {
        sein : {verb : "sein", english : "be", prep : "", con: "", presentStem : ["",""], strength : "strong", preteriteStem : "war", pastPart : "gewesen", aux : "sein"},
        haben : {verb : "haben", english : "have", prep : "", con: "", presentStem : ["",""], strength : "weak", preteriteStem : "hat", pastPart : "gehabt", aux : "haben"},
        werden : {verb : "werden", english : "become", prep : "", con: "", presentStem : ["",""], strength : "strong", preteriteStem : "wurd", pastPart : "geworden", aux : "sein"},
        kommen : {verb : "kommen", english : "come", prep: "", con: "", presentStem : ["komm","komm"], strength : "strong", preteriteStem : "kam", pastPart : "gekommen", aux : "sein"},
        ankommen : {verb : "ankommen", english : "arrive", prep : "an", con: "", presentStem : ["komm","komm"], strength : "strong", preteriteStem : "kam", pastPart : "angekommen", aux: "sein"},
        verlassen: {verb : "verlassen", english : "leave", prep : "", con: "", presentStem : ["verlass","verläss"], strength : "strong", preteriteStem : "verließ", pastPart : "verlassen", aux: "haben"},
        fahren : {verb : "fahren", english : "drive, ride", prep: "", con: "", presentStem : ["fahr","fähr"], strength : "strong", preteriteStem : "fuhr", pastPart : "gefahren", aux : "sein,haben"},
        halten : {verb : "halten", english : "hold, keep", prep : "", con: "", presentStem : ["halt","hält"], strength : "strong", preteriteStem : "hielt", pastPart : "gehalten", aux : "haben"},
        schlafen : {verb : "schlafen", english : "sleep", prep : "", con: "", presentStem : ["schlaf","schläf"], strength : "strong", preteriteStem : "schlief", pastPart : "geschlafen", aux : "haben"},
        erhalten : {verb : "erhalten", english : "revieve, get", prep : "", con: "", presentStem : ["erhalt","erhält"], strength : "strong", preteriteStem : "hielt", pastPart : "erhalten", aux : "haben"},
        fangen : {verb : "fangen", english : "catch", prep : "", con: "", presentStem : ["fang","fäng"], strength : "strong", preteriteStem : "fing", pastPart : "gefangen", aux : "haben"},
        anfangen : {verb : "anfangen", english : "begin", prep : "an", con: "", presentStem : ["fang","fäng"], strength : "strong", preteriteStem : "fing", pastPart : "angefangen", aux : "haben"},
        fallen : {verb : "fallen", english : "fall", prep : "", con: "", presentStem : ["fall","fäll"], strength : "strong", preteriteStem : "fiel", pastPart : "gefallen", aux : "sein"},
        vergessen : {verb : "vergessen", english : "forget", prep : "", con: "", presentStem : ["vergess","vergiss"], strength : "strong", preteriteStem : "vergaß", pastPart : "vergessen", aux : "haben"},
        essen : {verb : "essen", english : "eat", prep : "", con: "", presentStem : ["ess","iss"], strength : "strong", preteriteStem : "aß", pastPart : "gegessen", aux : "haben"},
        sterben : {verb : "sterben", english : "die", prep : "", con: "", presentStem : ["sterb","stirb"], strength : "strong", preteriteStem : "starb", pastPart : "gestorben", aux : "sein"},
        nehmen : {verb : "nehmen", english : "take", prep : "", con: "", presentStem : ["nehm","nimm"], strength : "strong", preteriteStem : "nahm", pastPart : "genommen", aux : "haben"},
        geschehen : {verb : "geschehen", english : "happen", prep : "", con: "", presentStem : ["gescheh","geschieh"], strength : "strong", preteriteStem : "geschah", pastPart : "geschehen", aux : "sein"},
        helfen : {verb : "helfen", english : "help", prep : "", con: "", presentStem : ["helf","hilf"], strength : "strong", preteriteStem : "half", pastPart : "geholfen", aux : "haben"},
        lesen : {verb : "lesen", english : "read", prep : "", con: "", presentStem : ["les","lies"], strength : "strong", preteriteStem : "las", pastPart : "gelesen", aux : "haben"},
        sprechen : {verb : "sprechen", english : "speak", prep : "", con: "", presentStem : ["sprech","sprich"], strength : "strong", preteriteStem : "sprach", pastPart : "gesprochen", aux : "haben"},
        geben : {verb : "geben", english : "give", prep : "", con: "", presentStem : ["geb","gib"], strength : "strong", preteriteStem : "gab", pastPart : "gegeben", aux : "haben"},
        treffen : {verb : "trefen", english : "meet", prep : "", con: "", presentStem : ["treff","triff"], strength : "strong", preteriteStem : "traf", pastPart : "getroffen", aux : "haben"},
        sehen : {verb : "sehen", english : "see", prep : "", con: "", presentStem : ["seh","sieh"], strength : "string", preteriteStem : "sah", pastPart : "gesehen", aux : "haben"},
        können : {verb : "können", english : "can", prep : "", con: "prt-prs", presentStem : ["könn","kann"], strength : "weak", preteriteStem : "konn", pastPart : "gekonnt", aux : "haben"},
        müssen : {verb : "müssen", english : "must", prep : "", con: "prt-prs", presentStem : ["müss","muss"], strength : "weak", preteriteStem : "muss", pastPart : "müssen", aux : "haben"},
        wollen : {verb : "wollen", english : "want", prep : "", con: "prt-prs", presentStem : ["woll","will"], strength : "weak", preteriteStem : "woll", pastPart : "", aux : "haben"},
        wissen : {verb : "wissen", english : "know", prep : "", con: "prt-prs", presentStem : ["wiss","wieß"], strength : "weak", preteriteStem : "wuss", pastPart : "gewussten", aux : "haben"},
        tun : {verb : "tun", english : "do", prep : "", con: "", presentStem : ["tu","tu"], strength : "weak", preteriteStem : "ta", pastPart : "getan", aux : "haben"},
        gehen : {verb : "gehen", english : "go, walk, leave", prep : "", con: "", presentStem : ["geh","geh"], strength : "strong", preteriteStem : "ging", pastPart : "gegangen", aux : "sein"},
        schreiben : {verb : "schreiben", english : "write", prep : "", con: "", presentStem : ["schreib","schreib"], strength : "strong", preteriteStem : "schrieb", pastPart : "geschrieben", aux : "haben"},
        erkennen : {verb : "erkennen", english : "recognise", prep : "", con: "", presentStem : ["erkenn","erkenn"], strength : "weak", preteriteStem : "erkann", pastPart : "erkannt", aux : "haben"},
        beschreiben : {verb : "beschreiben", english : "describe", prep : "", con: "", presentStem : ["beschreib","beschreib"], strength : "strong", preteriteStem : "beschrieb", pastPart : "beschrieben", aux : "haben"},
        schreien : {verb : "scheien", english : "scream", prep : "", con: "", presentStem : ["schei","schrei"], strength : "strong", preteriteStem : "schrie", pastPart : "geschrien", aux : "haben"},
        trinken : {verb : "trinken", english : "drink", prep : "", con: "", presentStem : ["trink","trink"], strength : "strong", preteriteStem : "trank", pastPart : "getrunken", aux : "haben"},
        denken : {verb : "denken", english : "think", prep : "", con: "", presentStem : ["denk","denk"], strength : "weak", preteriteStem : "dach", pastPart : "gedacht", aux : "haben"},
        entscheiden : {verb : "entscheiden", english : "decide", prep : "", con: "", presentStem : ["entscheid","entscheid"], strength : "strong", preteriteStem : "entschied", pastPart : "enschieden", aux : "haben"},
        verstehen : {verb : "verstehen", english : "understand", prep : "", con: "", presentStem : ["versteh","versteh"], strength : "strong", preteriteStem : "verstand", pastPart : "verstanden", aux : "haben"},
        finden : {verb : "finden", english : "find", prep : "", con: "", presentStem : ["find","find"], strength : "strong", preteriteStem : "fand", pastPart : "gefunden", aux : "haben"},
        singen : {verb : "singen", english : "sing", prep : "", con: "", presentStem : ["sing","sing"], strength : "strong", preteriteStem : "sang", pastPart : "gesungen", aux : "haben"},
        sitzen : {verb : "sitzen", english : "sit", prep : "", con: "", presentStem : ["sitz","sitz"], strength : "strong", preteriteStem : "saß", pastPart : "gesessen", aux : "sein,haben"},
        lügen : {verb : "lügen", english : "lie", prep : "", con: "", presentStem : ["lüg","lüg"], strength : "strong", preteriteStem : "log", pastPart : "gelogen", aux : "haben"},
        anbieten : {verb : "anbieten", english : "offer", prep : "an", con: "", presentStem : ["biet","biete"], strength : "strong", preteriteStem : "bot", pastPart : "angeboten", aux : "haben"},
        bringen : {verb : "bringen", english : "bring", prep : "", con: "", presentStem : ["bring","bring"], strength : "weak", preteriteStem : "brach", pastPart : "gebracht", aux : "haben"},
        brennen : {verb : "brennen", english : "burn", prep : "", con: "", presentStem : ["brenn","brenn"], strength : "weak", preteriteStem : "brann", pastPart : "gebrannt", aux : "haben"},
        schneiden : {verb : "schneiden", english : "cut", prep : "", con: "", presentStem : ["schneid","schneid"], strength : "strong", preteriteStem : "schnitt", pastPart : "geschnitten", aux : "haben"},
        beginnen : {verb : "beginnen", english : "start, begin", prep : "", con: "", presentStem : ["beginn","beginn"], strength : "strong", preteriteStem : "begann", pastPart : "begonnen", aux : "haben"},
        gewinnen : {verb : "gewinnen", english : "win", prep : "", con: "", presentStem : ["gewinn","gewinn"], strength : "strong", preteriteStem : "gewann", pastPart : "gewonnen", aux : "haben"},
        bleiben : {verb : "bleiben", english : "stay, last", prep : "", con: "", presentStem : ["bleib","bleib"], strength : "strong", preteriteStem : "blieb", pastPart : "geblieben", aux : "sein"},
        rennen : {verb : "rennen", english : "run", prep : "", con: "", presentStem : ["renn","renn"], strength : "strong", preteriteStem : "rann", pastPart : "gerannt", aux : "sein,haben"},
        verlieren : {verb : "verlieren", english : "lose", prep : "", con: "", presentStem : ["verlier","verlier"], strength : "strong", preteriteStem : "verlor", pastPart : "verloren", aux : "haben"},
        rufen : {verb : "rufen", english : "call", prep : "", con: "", presentStem : ["ruf","ruf"], strength : "strong", preteriteStem : "rief", pastPart : "gerufen", aux : "haben"},
        heißen : {verb : "heißen", english : "mean", prep : "", con: "", presentStem : ["heiß","heiß"], strength : "strong", preteriteStem : "hieß", pastPart : "geheißen", aux : "haben"},
        lernen : {verb : "lernen", english : "learn", prep : "", con: "", presentStem : ["lern","lern"], strength : "weak", preteriteStem : "lern", pastPart : "gelernt", aux : "haben"},
        machen : {verb : "machen", english : "do, make", prep : "", con: "", presentStem : ["mach","mach"], strength : "weak", preteriteStem : "mach", pastPart : "gemacht", aux : "haben"},
        besuchen : {verb : "besuchen", english : "visit", prep : "", con: "", presentStem : ["besuch","besuch"], strength : "weak", preteriteStem : "besuch", pastPart : "besucht", aux : "haben"},
        reisen : {verb : "reisen", english : "travel", prep : "", con: "", presentStem : ["reis","reis"], strength : "weak", preteriteStem : "reis", pastPart : "gereist", aux : "sein"},
        brauchen : {verb : "brauchen", english : "need", prep : "", con: "", presentStem : ["brauch","brauch"], strength : "weak", preteriteStem : "brauch", pastPart : "gebraucht", aux : "haben"},
        legen : {verb : "legen", english : "lay, put", prep : "", con: "", presentStem : ["leg","leg"], strength : "weak", preteriteStem : "leg", pastPart : "gelegt", aux : "haben"},
        zeigen : {verb : "zeigen", english : "show", prep : "", con: "", presentStem : ["zeig","zeig"], strength : "weak", preteriteStem : "zeig", pastPart : "gezeigt", aux : "haben"},
        hören : {verb : "hören", english : "hear", prep : "", con: "", presentStem : ["hör","hör"], strength : "weak", preteriteStem : "hör", pastPart : "gehört", aux : "haben"},
        schauen : {verb : "schauen", english : "look", prep : "", con: "", presentStem : ["schau","schau"], strength : "weak", preteriteStem : "schau", pastPart : "geschaut", aux : "haben"},
        sagen : {verb : "sagen", english : "say", prep : "", con: "", presentStem : ["sag","sag"], strength : "weak", preteriteStem : "sag", pastPart : "gesagt", aux : "haben"},
        erklären : {verb : "erklären", english : "explain", prep : "", con: "", presentStem : ["erklär","erklär"], strength : "weak", preteriteStem : "erklär", pastPart : "erklärt", aux : "haben"},
        erzählen : {verb : "erzählen", english : "tell", prep : "", con: "", presentStem : ["erzähl","erzähl"], strength : "weak", preteriteStem : "erzähl", pastPart : "erzählt", aux : "haben"},
        fragen : {verb : "fragen", english : "ask", prep : "", con: "", presentStem : ["frag","frag"], strength : "weak", preteriteStem : "frag", pastPart : "gefragt", aux : "haben"},
        reden : {verb : "reden", english : "talk", prep : "", con: "", presentStem : ["red","rede"], strength : "weak", preteriteStem : "rede", pastPart : "geredet", aux : "haben"},
        wiederholen : {verb : "wiederholen", english : "repeat", prep : "", con: "", presentStem : ["wiederhol","wiederhol"], strength : "weak", preteriteStem : "wiederhol", pastPart : "gewiederholt", aux : "haben"},
        lehren : {verb : "lehren", english : "teach", prep : "", con: "", presentStem : ["lehr","lehr"], strength : "weak", preteriteStem : "lehr", pastPart : "gelehrt", aux : "haben"},
        studieren : {verb : "studieren", english : "study", prep : "", con: "", presentStem : ["studier","studier"], strength : "studier", preteriteStem : "studier", pastPart : "studiert", aux : "haben"},
        ausruhen : {verb : "ausruhen", english : "rest", prep : "aus", con: "", presentStem : ["ruh","ruh"], strength : "weak", preteriteStem : "ruh", pastPart : "ausgeruht", aux : "haben"},
        erlauben : {verb : "erlauben", english : "allow", prep : "", con: "", presentStem : ["erlaub","erlaub"], strength : "weak", preteriteStem : "erlaub", pastPart : "erlaubt", aux : "haben"},
        glauben : {verb : "glauben", english : "believe", prep : "", con: "", presentStem : ["glaub","glaub"], strength : "weak", preteriteStem : "glaub", pastPart : "geglaubt", aux : "haben"},
        hoffen : {verb : "hoffen", english : "hope", prep : "", con: "", presentStem : ["hoff","hoff"], strength : "weak", preteriteStem : "hoff", pastPart : "hoff", aux : "haben"},
        tanzen : {verb : "tanzen", english : "dance", prep : "", con: "", presentStem : ["tanz","tanz"], strength : "weak", preteriteStem : "tanz", pastPart : "getanzt", aux : "haben,sein"},
        bewegen : {verb : "bewegen", english : "move", prep : "", con: "", presentStem : ["beweg","beweg"], strength : "strong", preteriteStem : "bewog", pastPart : "bewogen", aux : "haben"},
        kämpfen : {verb : "kämpfen", english : "fight", prep : "", con: "", presentStem : ["kämpf","kämpf"], strength : "weak", preteriteStem : "kämpf", pastPart : "gekämpft", aux : "haben"},
        auswählen : {verb : "auswählen", english : "choose", prep : "aus", con: "", presentStem : ["wähl","wähl"], strength : "weak", preteriteStem : "wähl", pastPart : "ausgewählt", aux : "haben"},
        hassen : {verb : "hassen", english : "hate", prep : "", con: "", presentStem : ["hass","hass"], strength : "weak", preteriteStem : "hass", pastPart : "gehasst", aux : "haben"},
        lieben : {verb : "lieben", english : "love", prep : "", con: "", presentStem : ["lieb","lieb"], strength : "weak", preteriteStem : "lieb", pastPart : "geliebt", aux : "haben"},
        bevorzugen : {verb : "bevorzugen", english : "prefer", prep : "", con: "", presentStem : ["bevorzug","bevorzug"], strength : "weak", preteriteStem : "bevorzug", pastPart : "bevorzugt", aux : "haben"},
        lachen : {verb : "lachen", english : "laugh", prep : "", con: "", presentStem : ["lach","lach"], strength : "weak", preteriteStem : "lach", pastPart : "gelacht", aux : "haben"},
        weinen : {verb : "weinen", english : "cry", prep : "", con: "", presentStem : ["wein","wein"], strength : "weak", preteriteStem : "wein", pastPart : "wein", aux : "haben"},
        versuchen : {verb : "versuchen", english : "try", prep : "", con: "", presentStem : ["versuch","versuch"], strength : "weak", preteriteStem : "versuch", pastPart : "versucht", aux : "haben"},
        üben : {verb : "üben", english : "practice", prep : "", con: "", presentStem : ["üb","üb"], strength : "weak", preteriteStem : "üb", pastPart : "geübt", aux : "haben"},
        berühen : {verb : "berühen", english : "touch", prep : "", con: "", presentStem : ["berüh","berüh"], strength : "weak", preteriteStem : "berüh", pastPart : "berüht", aux : "haben"},
        drücken : {verb : "drücken", english : "press", prep : "", con: "", presentStem : ["drück","drück"], strength : "weak", preteriteStem : "drück", pastPart : "gedrückt", aux : "haben"},
        leben : {verb : "leben", english : "live", prep : "", con: "", presentStem : ["leb","leb"], strength : "weak", preteriteStem : "leb", pastPart : "gelebt", aux : "haben"},
        fühlen : {verb : "fühl", english : "feel", prep : "", con: "", presentStem : ["fühl","fühl"], strength : "weak", preteriteStem : "fühl", pastPart : "gefühlt", aux : "haben"},
        spielen : {verb : "spielen", english : "", prep : "", con: "", presentStem : ["spiel","spiel"], strength : "weak", preteriteStem : "weak", pastPart : "spiel", aux : "haben"},
        kaufen : {verb : "kaufen", english : "buy, purchase", prep : "", con: "", presentStem : ["kauf","kauf"], strength : "weak", preteriteStem : "kauf", pastPart : "gekauft", aux : "haben"},
        verkaufen : {verb : "verkaufen", english : "sell", prep : "", con: "", presentStem : ["verkauf","verkauf"], strength : "weak", preteriteStem : "verkauf", pastPart : "verkauft", aux : "haben"},
        kosten : {verb : "kosten", english : "cost, taste", prep : "", con: "", presentStem : ["kost","koste"], strength : "weak", preteriteStem : "koste", pastPart : "gekostet", aux : "haben"},
        benutzen : {verb : "benutzen", english : "use", prep : "", con: "", presentStem : ["benutz","benutz"], strength : "weak", preteriteStem : "benutz", pastPart : "benutzt", aux : "haben"},
        handeln : {verb : "handeln", english : "act, trade", prep : "", con: "", presentStem : ["handel","handel"], strength : "weak", preteriteStem : "handel", pastPart : "gehandelt", aux : "haben"},
        verbessern : {verb : "verbessern", english : "improve", prep : "", con: "", presentStem : ["verbesser","verbesser"], strength : "weak", preteriteStem : "verbesser", pastPart : "verbessert", aux : "haben"},
        lächeln : {verb : "lächeln", english : "smile", prep : "", con: "", presentStem : ["lächel","lächel"], strength : "weak", preteriteStem : "lächel", pastPart : "gelächelt", aux : "haben"},
        arbeiten : {verb : "arbeiten", english : "work", prep : "", con: "", presentStem : ["arbeit","arbeite"], strength : "weak", preteriteStem : "arbeite", pastPart : "gearbeitet", aux : "haben"},
        antworten : {verb : "antworten", english : "answer", prep : "", con: "", presentStem : ["antwort","antworte"], strength : "weak", preteriteStem : "antworte", pastPart : "geantwortet", aux : "haben"},
        schalten : {verb : "schalten", english : "switch", prep : "", con: "", presentStem : ["schalt","schalte"], strength : "weak", preteriteStem : "schalte", pastPart : "geschaltet,geschalten", aux : "haben"},
    }

    const dissallowed = ['sein perfekt','sein plusquamperfekt','haben perfekt','haben plusquamperfekt','können perfekt','können plusquamperfekt','müssen perfekt','müssen plusquamperfect','wollen perfekt','wollen plusquamperfekt','vergessen präteritum']
    
    const person = {
        firstSg : "ich ",
        secondSg : "du ",
        thirdSg : {masc: "er ", fem : "sie ", neut: "es "},
        firstPl : "wir ",
        secondPl : "ihr ",
        thirdPl : {fm: "Sie ", infm: "sie "}
      }
      
    const tense = {
        präsens : "präsens",
        präteritum : "präteritum",
        perfekt : "perfekt",
        plusquamperfekt : "plusquamperfekt",
        futurI : "futur I",
        futurII : "futur II"
     }
    
    function conjugate(verb, english, prep, con, presentStem, strength, preteriteStem, pastPart, aux, pers, ten) {
        let conjugated = ""
        switch (ten) {
            case 'präsens' : conjugated = conjugateWhichPRS(prep, con, presentStem, pers); break
            case 'präteritum' : conjugated = conjugatePRT(prep, strength, preteriteStem, pers); break
            case 'perfekt' : conjugated = conjugatePRF(pastPart, aux, pers); break
            case 'plusquamperfekt' : conjugated = conjugatePPRF(pastPart, aux, pers); break
            case 'futurI' : conjugated = conjugateFUTI(verb, pers); break
            case 'futurII' :  conjugated = conjugateFUTII(pastPart, aux, pers); break
        }
        try {
            if (irregs[verb][ten][pers] === undefined) {
                return conjugated
            } else
            conjugated = irregs[verb][ten][pers]
            return conjugated
         } catch (e) {
            switch (conjugated) {
                case "verließst" : return "verließt"
                case "hältt" : return "hält"
                case "erhältt" : return "erhält"
                case "vergissst" : return "vergisst"
                case "vergaßst" : return "vergaßt"
                case "issst" : return "isst"
                case "aßst" : return "aßt"
                case "liesst" : return "liest"
                case "lasst" : return "last"
                case "mussst" : return "musst"
                case "wießst" : return "wießt"
                case "heißst" : return "heißt"
                default : return conjugated
            }
         }
    }

    function conjugateWhichPRS(prep, con, presentStem, pers) {
        switch (con) {
            case 'prt-prs' : return conjugatePRTPRS(prep, presentStem, pers)
            case '' : return conjugatePRS(prep, presentStem, pers)
        }
    }
    
    function conjugatePRS(prep, presentStem, pers) {
        switch (pers) {
            case 'firstSg' : return (presentStem[0] + "e" + " " + prep).trim()
            case 'secondSg': return (presentStem[1] + "st" + " " + prep).trim()
            case 'thirdSg' : return (presentStem[1] + "t" + " " + prep).trim()
            case 'firstPl' : return (presentStem[0] + "en" + " " + prep).trim()
            case 'secondPl': return (presentStem[0] + "t" + " " + prep).trim()
            case 'thirdPl' : return (presentStem[0] + "en" + " " + prep).trim()
        }
    }

    function conjugatePRTPRS(prep, presentStem, pers) {
        switch (pers) {
            case 'firstSg' : return (presentStem[1] + " " + prep).trim()
            case 'secondSg': return (presentStem[1] + "st" + " " + prep).trim()
            case 'thirdSg' : return (presentStem[1] + " " + prep).trim()
            case 'firstPl' : return (presentStem[0] + "en" + " " + prep).trim()
            case 'secondPl': return (presentStem[0] + "t" + " " + prep).trim()
            case 'thirdPl' : return (presentStem[0] + "en" + " " + prep).trim()
        }
    }

    function conjugatePRT(prep, strength, preteriteStem, pers) {
        switch (strength) {
            case "weak" : return conjugateWeakPRT(prep, preteriteStem, pers)
            case "strong" : return conjugateStrPRT(prep, preteriteStem, pers)
        }
    }
    
    function conjugateWeakPRT(prep, preteriteStem, pers) {
        switch (pers) {
            case 'firstSg' : return (preteriteStem + "te" + " " + prep).trim()
            case 'secondSg': return (preteriteStem + "test" + " " + prep).trim()
            case 'thirdSg' : return (preteriteStem + "te" + " " + prep).trim()
            case 'firstPl' : return (preteriteStem + "ten" + " " + prep).trim()
            case 'secondPl': return (preteriteStem + "tet" + " " + prep).trim()
            case 'thirdPl' : return (preteriteStem + "ten" + " " + prep).trim()
        }
    }

    function conjugateStrPRT(prep, preteriteStem, pers) {
        switch (pers) {
            case 'firstSg' : return (preteriteStem + " " + prep).trim()
            case 'secondSg': return (preteriteStem + "st" + " " + prep).trim()
            case 'thirdSg' : return (preteriteStem + " " + prep).trim()
            case 'firstPl' : return (preteriteStem + "en" + " " + prep).trim()
            case 'secondPl': return (preteriteStem + "t" + " " + prep).trim()
            case 'thirdPl' : return (preteriteStem + "en" + " " + prep).trim()
        }
    }
    
    const perfHelper = ["", ","]

    function conjugatePRF (pastPart, aux, pers) {
        let it = 0
        let conjugatedPerfect = ""
        let pastParts = pastPart.split(",")
        let auxes = aux.split(",")
        for (indexPastParts = 0; indexPastParts <= pastParts.length - 1; indexPastParts++) {
            for (indexAuxes = 0; indexAuxes <= auxes.length - 1; indexAuxes++) {
                conjugatedPerfect = conjugatedPerfect + perfHelper[it++] + irregs[auxes[indexAuxes]].präsens[pers] + " " + pastParts[indexPastParts]
            }
        }
        return conjugatedPerfect
    }
    
    function conjugatePPRF (pastPart, aux, pers) {
        let it = 0
        let conjugatedPluPerfect = ""
        let pastParts = pastPart.split(",")
        let auxes = aux.split(",")
        for (indexPastParts = 0; indexPastParts <= pastParts.length - 1; indexPastParts++) {
            for (indexAuxes = 0; indexAuxes <= auxes.length - 1; indexAuxes++) {
                conjugatedPluPerfect = conjugatedPluPerfect + perfHelper[it++] + irregs[auxes[indexAuxes]].präteritum[pers] + " " + pastParts[indexPastParts]
            }
        }
        return conjugatedPluPerfect
    }
    
    function conjugateFUTI (verb, pers) {
        return irregs.werden.präsens[pers] + " " + verb
    }

    function conjugateFUTII(pastPart, aux, pers) {
        let it =  0
        let conjugatedFutPerfect = ""
        let pastParts = pastPart.split(",")
        let auxes = aux.split(",")
        for (indexPastParts = 0; indexPastParts <= pastParts.length - 1; indexPastParts++) {
            for (indexAuxes = 0; indexAuxes <= auxes.length - 1; indexAuxes++) {
                conjugatedFutPerfect = conjugatedFutPerfect + perfHelper[it++] + irregs.werden.präsens[pers] + " " + pastParts[indexPastParts] + " " + auxes[indexAuxes]
            }
        }
        return conjugatedFutPerfect
    }
    
     /** This will create an object output of all the verbs.
    for (let v in verbs_list) {
        german[v] = {}
        german[v].english = verbs_list[v].english
        for (let t in tense) {
            german[v][tense[t]] = []
            for (let p in person) {
                switch (p) {
                    case 'thirdSg': for (let g in person.thirdSg) {german[v][tense[t]].push(person.thirdSg[g] + conjugate(...Object.values(verbs_list[v]), p, t))}; break;
                    case 'thirdPl' : for (let g in person.thirdPl) {german[v][tense[t]].push(person.thirdPl[g] + conjugate(...Object.values(verbs_list[v]), p, t))}; break;
                    default : german[v][tense[t]].push(person[p] + conjugate(...Object.values(verbs_list[v]), p, t))
                }
            }
        }
    }
    
    console.log(JSON.stringify(german, null, 1))
     */


    create_board(board)

    document.addEventListener('click', function (event){
        if (event.target.tagName === 'DIV') {
            tar = get_tar("." + turn + "ish")
            switch (tar.dataset.person) {
                case 'thirdSg': pronoun = Object.values(person.thirdSg)[Math.floor(Math.random() * 2)]; break;
                case 'thirdPl' : pronoun = Object.values(person.thirdPl)[Math.floor(Math.random() * 1)]; break;
                default : pronoun = person[tar.dataset.person]
            }
            input.value = pronoun
            wait = 1
        }
    })
    
    document.addEventListener('keyup', function (event) {
        if (event.code === 'Enter') {
            wait = 0
            tar = get_tar("." + turn + "ish")
            v = tar.dataset.verb
            p = tar.dataset.person
            t = tar.dataset.tense
            check = conjugate(...Object.values(verbs_list[v]),p,t).split(",")
            if (check.some(c => input.value.includes(c))) {
                tar.classList.remove(turn + 'ish')
                tar.classList.add(turn)
                switch (turn) {
                    case "red":
                        turn = "yellow"
                        break
                    case "yellow":
                        turn = "red"
                        break
                }
                tarId = parseInt(tar.id)
                tar = document.getElementById(tarId-7)
                tar.classList.add('reveal')
            }
        }
    })
})