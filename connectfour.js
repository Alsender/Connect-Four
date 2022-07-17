document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container')
    const board = document.getElementById('board')
    const input = document.getElementById("input")
    let turn = "red"
    let wait = 0

    const german = {
        "sein" : {
            "präsens" : {
                "ich": "bin",       "wir": "sind",
                "du": "bist",       "ihr": "seid",
                "er": "ist",        "Sie": "sind",
                "sie (f.)": "ist",  "sie (pl.)": "sind",
                "es": "ist"
            },
            "präteritum" : {
                "ich": "war",       "wir": "waren",
                "du": "warst",      "ihr": "wart",
                "er": "war",        "Sie": "waren",
                "sie (f.)": "war",  "sie (pl.)": "waren",
                "es": "war"
            },
            "perfekt" : {
                "ich": "bin gewesen",       "wir": "sind gewesen",
                "du": "bist gewesen",       "ihr": "seid gewesen",
                "er": "ist gewesen",        "Sie": "sind gewesen",
                "sie (f.)": "ist gewesen",  "sie (pl.)": "sind gewesen",
                "es": "ist gewesen"
            },
            "plusquamperfekt" : {
                "ich": "war gewesen",       "wir": "waren gewesen",
                "du": "warst gewesen",      "ihr": "wart gewesen",
                "er": "war gewesen",        "Sie": "sind gewesen",
                "sie (f.)": "war gewesen",  "sie (pl.)": "sind gewesen",
                "es": "war gewesen"
            },
            "futur I" : {
                "ich": "werde sein",    "wir": "werden sein",
                "du": "wirst sein",     "ihr": "werdet sein",
                "er": "wird sein",      "Sie": "werden sein",
                "sie (f.)": "wird sein","sie (pl.)": "werden sein",
                "es": "wird sein"
            },
            "futur II" : {
                "ich": "werde gewesen sein",    "wir": "werden gewesen sein",
                "du": "wirst gewesen sein",     "ihr": "werdet gewesen sein",
                "er": "wird gewesen sein",      "Sie": "werden gewesen sein",
                "sie (f.)": "wird gewesen sein","sie (pl.)": "werden gewesen sein",
                "es": "wird gewesen sein"
            }
        },
        "haben" : {
            "präsens" : {
                "ich": "habe",      "wir": "haben",
                "du": "hast",       "ihr": "habt",
                "er": "hat",        "Sie": "haben",
                "sie (f.)": "hat",  "sie (pl.)": "haben",
                "es": "hat"
            },
            "präteritum" : {
                "ich": "hatte",     "wir": "hatten",
                "du": "hattest",    "ihr": "hattet",
                "er": "hatte",      "Sie": "hatten",
                "sie (f.)": "hatte","sie (pl.)": "hatten",
                "es": "hatte"
            },
            "perfekt" : {
                "ich": "habe gehabt",       "wir": "haben gehabt",
                "du": "hast gehabt",        "ihr": "habt gehabt",
                "er": "hat gehabt",         "Sie": "haben gehabt",
                "sie (f.)": "hat gehabt",   "sie (pl.)": "haben gehabt",
                "es": "hat gehabt"
            },
            "plusquamperfekt" : {
                "ich": "hatte gehabt",      "wir": "hatten gehabt",
                "du": "hattest gehabt",     "ihr": "hattet gehabt",
                "er": "hatte gehabt",       "Sie": "hatten gehabt",
                "sie (f.)": "hatte gehabt", "sie (pl.)": "hatten gehabt",
                "es": "hatte gehabt"
            },
            "futur I" : {
                "ich": "werde haben",       "wir": "werden haben",
                "du": "wirst haben",        "ihr": "werdet haben",
                "er": "wird haben",         "Sie": "werden haben",
                "sie (f.)": "wird haben",   "sie (pl.)": "werden haben",
                "es": "wird haben"
            },
            "futur II" : {
                "ich": "werde gehabt haben",        "wir": "werden gehabt haben",
                "du": "wirst gehabt haben",         "ihr": "werdet gehabt haben",
                "er": "wird gehabt haben",          "Sie": "werden gehabt haben",
                "sie (f.)": "werden gehabt haben",  "sie (pl.)": "werden gehabt haben",
                "es": "wird gehabt haben"
            },
        },

        "werden" : {
            "präsens" : {
                "ich": "werde",     "wir": "werden",
                "du": "wirst",      "ihr": "werdet",
                "er": "wird",       "Sie": "werden",
                "sie (f.)": "wird", "sie (pl.)": "werden",
                "es": "wird"
            },
            "präteritum" : {
                "ich": "wurde",         "wir": "wurden",
                "du": "wurdest",        "ihr": "wurdet",
                "er": "wurde",          "Sie": "wurden",
                "sie (f.)": "wurde",    "sie (pl.)": "wurden",
                "es": "wurde"
            },
            "perfekt" : {
                "ich": "bin geworden",      "wir": "sind geworden",
                "du": "bist geworden",      "ihr": "seid geworden",
                "er": "ist geworden",       "Sie": "sind geworden",
                "sie (f.)": "ist geworden", "sie (pl.)": "sind geworden",
                "es": "ist geworden"
            },
            "plusquamperfekt" : {
                "ich": "war geworden",      "wir": "waren geworden",
                "du": "warst geworden",     "ihr": "wart geworden",
                "er": "war geworden",       "Sie": "waren geworden",
                "sie (f.)": "war geworden", "sie (pl.)": "waren geworden",
                "es": "war geworden"
            },
            "futur I" : {
                "ich": "werde werden",      "wir": "werden werden",
                "du": "wirst werden",       "ihr": "werdet werden",
                "er": "wird werden",        "Sie": "werden werden",
                "sie (f.)": "wird werden",  "sie (pl.)": "werden werden",
                "es": "wird werden"
            },
            "futur II" : {
                "ich": "werde geworden sein",       "wir": "werden geworden sein",
                "du": "wirst geworden sein",        "ihr": "werdet geworden sein",
                "er": "wird geworden sein",         "Sie": "werden geworden sein",
                "sie (f.)": "wird geworden sein",   "sie (pl.)": "werden geworden sein",
                "es": "wird geworden sein"
            }
        }
    }

    /**
            "erhalten" : {},
            "fangen" : {},
            "anfangen" : {},
            "fallen" : {},
            "vergessen" : {},
            "essen" : {},
            "sterben" : {},
            "nehmen" : {},
            "geschehen" : {},
            "helfen" : {},
            "lesen" : {},
            "sprechen" : {},
            "geben" : {},
            "treffen" : {},
            "sehen" : {},
            "können" : {},
            "müssen" : {},
            "wollen" : {},
            "wissen" : {},
            "tun" : {},
            "gehen" : {},
            "schreiben" : {},
            "erkennen" : {},
            "beschreiben" : {},
            "schreien" : {},
            "trinken" : {},
            "denken" : {},
            "entscheiden" : {},
            "verstehen" : {},
            "finden" : {},
            "singen" : {},
            "sitzen" : {},
            "lügen" : {},
            "anbieten" : {},
            "bringen" : {}
     */

    function create_board (container) {
        for (i = 0; i < 42; i++) {
            square = document.createElement("div")
            container.appendChild(square)
            square.id = i
            rand_word = Object.keys(verbs_list)
            rand_tense = Object.keys(german["sein"])
            rand_person = Object.keys(german["sein"]["präsens"])
            rand_index_words = Math.floor(Math.random() * rand_word.length)
            rand_index_tenses = Math.floor(Math.random() * rand_tense.length)
            rand_index_persons = Math.floor(Math.random() * rand_person.length)
            string = rand_word[rand_index_words] + "<br /><br />" + rand_tense[rand_index_tenses]
            square.innerHTML = string
            square.dataset.verb = Object.keys(verbs_list)[rand_index_words]
            square.dataset.tense = Object.keys(german["sein"])[rand_index_tenses]
            square.dataset.person = Object.keys(german["sein"]["präsens"])[rand_index_persons]
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
        fahren : {verb : "fahren", prep: "", PrsStemReg : "fahr", PrsStemIrreg : "fähr", strength : "strong", PrtStem : "fuhr", pastPart : "gefahren", aux : "haben"},
        kommen : {verb : "kommen", prep: "", PrsStemReg : "komm", PrsStemIrreg : "komm", strength : "strong", PrtStem : "kam", pastPart : "gekommen", aux : "sein"},
        ankommen : {verb : "ankommen", prep : "an", PrsStemReg : "komm", PrsStemIrreg : "komm", strength : "strong", PrtStem : "kam", pastPart : "angekommen", aux: "sein"},
        verlassen: {verb : "verlassen", prep : "", PrsStemReg : "verlass", PrsStemIrreg : "verläss", strength : "strong", PrtStem : "verließ", pastPart : "verlassen", aux: "haben"},
        halten : {verb : "halten", prep : "", PrsStemReg : "halt", PrsStemIrreg : "hält", strength : "strong", PrtStem : "hielt", pastPart : "gehalten", aux : "haben"},
        schlafen : {verb : "schlafen", prep : "", PrsStemReg : "schlaf", PrsStemIrreg : "schläf", strength : "strong", PrtStem : "schlief", pastPart : "geschlafen", aux : "haben"}
    }
    
    const person = {
        ich : "ich",
        du : "du",
        er : "er",
        "sie (f.)" : "sie (f.)",
        es : "es",
        wir : "wir",
        ihr : "ihr",
        "Sie" : "Sie",
        "sie (pl.)" : "sie (pl.)"
      }
      
    const tense = {
        präsens : "präsens",
        präteritum : "präteritum",
        perfekt : "perfekt",
        plusquamperfekt : "plusquamperfekt",
        "futur I" : "futur I",
        "futur II" : "futur II"
    }
    
    function conjugate(verb, prep, PrsStemReg, PrsStemIrreg, strength, PrtStem, pastPart, aux, pers, ten) {
        switch (ten) {
            case tense.präsens : return conjugatePRS(prep, PrsStemReg, PrsStemIrreg, pers)
            case tense.präteritum : return conjugatePRT(prep, strength, PrtStem, pers)
            case tense.perfekt : return conjugatePRF(pastPart, aux, pers)
            case tense.plusquamperfekt : return conjugatePPRF(pastPart, aux, pers)
            case tense["futur I"] : return conjugateFUTI(verb, pers)
            case tense["futur II"] : return conjugateFUTII(pastPart, aux, pers)
        }
    }
    
    function conjugatePRS(prep, PrsStemReg, PrsStemIrreg, pers) {
        switch (pers) {
            case person.ich : return PrsStemReg + "e" + " " + prep
            case person.du : return PrsStemIrreg + "st" + " " + prep
            case person.er : return PrsStemIrreg + "t" + " " + prep
            case person["sie (f.)"] : return PrsStemIrreg + "t" + " " + prep
            case person.es : return PrsStemIrreg + "t" + " " + prep
            case person.wir : return PrsStemReg + "en" + " " + prep
            case person.ihr : return PrsStemReg + "t" + " " + prep
            case person["Sie"] : return PrsStemReg + "en" + " " + prep
            case person["sie (pl.)"] : return PrsStemReg + "en" + " " + prep
        }
    }

    function conjugatePRT(prep, strength, PrtStem, pers) {
        switch (strength) {
            case "weak" : return conjugateWeakPRT(prep, PrtStem, pers)
            case "strong" : return conjugateStrPRT(prep, PrtStem, pers)
        }
    }
    
    function conjugateWeakPRT(prep, PrtStem, pers) {
        switch (pers) {
            case person.ich : return PrtStem + "te" + " " + prep
            case person.du : return PrtStem + "test" + " " + prep
            case person.er : return PrtStem + "te" + " " + prep
            case person["sie (f.)"] : return PrtStem + "te" + " " + prep
            case person.es : return PrtStem + "te" + " " + prep
            case person.wir : return PrtStem + "ten" + " " + prep
            case person.ihr : return PrtStem + "tet" + " " + prep
            case person["Sie"] : return PrtStem + "ten" + " " + prep
            case person["sie (pl.)"] : return PrtStem + "ten" + " " + prep
        }
    }

    function conjugateStrPRT(prep, PrtStem, pers) {
        switch (pers) {
            case person.ich : return PrtStem + " " + prep
            case person.du : return PrtStem + "st" + " " + prep
            case person.er : return PrtStem + " " + prep
            case person["sie (f.)"] : return PrtStem + " " + prep
            case person.es : return PrtStem + " " + prep
            case person.wir : return PrtStem + "en" + " " + prep
            case person.ihr : return PrtStem + "t" + " " + prep
            case person["Sie"] : return PrtStem + "en" + " " + prep
            case person["sie (pl.)"] : return PrtStem + "en" + " " + prep
        }
    }
    
    function conjugatePRF (pastPart, aux, pers) {
        switch (pers) {
            case person.ich : return german[aux].präsens[pers] + " " + pastPart
            case person.du : return german[aux].präsens[pers] + " " + pastPart
            case person.er : return german[aux].präsens[pers] + " " + pastPart
            case person["sie (f.)"] : return german[aux].präsens[pers] + " " + pastPart
            case person.es : return german[aux].präsens[pers] + " " + pastPart
            case person.wir : return german[aux].präsens[pers] + " " + pastPart
            case person.ihr : return german[aux].präsens[pers] + " " + pastPart
            case person["Sie"] : return german[aux].präsens[pers] + " " + pastPart
            case person["sie (pl.)"] : return german[aux].präsens[pers] + " " + pastPart
        }
    }
    
    function conjugatePPRF (pastPart, aux, pers) {
        switch (pers) {
            case person.ich : return german[aux].präteritum[pers] + " " + pastPart
            case person.du : return german[aux].präteritum[pers] + " " + pastPart
            case person.er : return german[aux].präteritum[pers] + " " + pastPart
            case person["sie (f.)"] : return german[aux].präteritum[pers] + " " + pastPart
            case person.es : return german[aux].präteritum[pers] + " " + pastPart
            case person.wir : return german[aux].präteritum[pers] + " " + pastPart
            case person.ihr : return german[aux].präteritum[pers] + " " + pastPart
            case person["Sie"] : return german[aux].präteritum[pers] + " " + pastPart
            case person["sie (pl.)"] : return german[aux].präteritum[pers] + " " + pastPart
        }
    }
    
    function conjugateFUTI (verb, pers) {
        switch (pers) {
            case person.ich : return german.werden.präsens[pers] + " " + verb
            case person.du : return german.werden.präsens[pers] + " " + verb
            case person.er : return german.werden.präsens[pers] + " " + verb
            case person["sie (f.)"] : return german.werden.präsens[pers] + " " + verb
            case person.es : return german.werden.präsens[pers] + " " + verb
            case person.wir : return german.werden.präsens[pers] + " " + verb
            case person.ihr : return german.werden.präsens[pers] + " " + verb
            case person["Sie"] : return german.werden.präsens[pers] + " " + verb
            case person["sie (pl.)"] : return german.werden.präsens[pers] + " " + verb
        }
    }
    
    function conjugateFUTII (pastPart, aux, pers) {
        switch (pers) {
            case person.ich : return german.werden.präsens[pers] + " " + pastPart + " " + aux
            case person.du : return german.werden.präsens[pers] + " " + pastPart + " " + aux
            case person.er : return german.werden.präsens[pers] + " " + pastPart + " " + aux
            case person["sie (f.)"] : return german.werden.präsens[pers] + " " + pastPart + " " + aux
            case person.es : return german.werden.präsens[pers] + " " + pastPart + " " + aux
            case person.wir : return german.werden.präsens[pers] + " " + pastPart + " " + aux
            case person.ihr : return german.werden.präsens[pers] + " " + pastPart + " " + aux
            case person["Sie"] : return german.werden.präsens[pers] + " " + pastPart + " " + aux
            case person["sie (pl.)"] : return german.werden.präsens[pers] + " " + pastPart + " " + aux
        }
    }
    
    /** This will create a JSON output of all the verbs.
    for (let v in verbs_list) {
        german[v] = {}
        for (let t in tense) {
            german[v][t] = {}
            for (let p in person) {
                //console.log(...Object.values(verbs_list[v]), p, t)
                german[v][t][p] = conjugate(...Object.values(verbs_list[v]), p, t)
            }
        }
    }
     */

    function checkIrreg(verb) {
        switch (verb) {
            case "hältt " : return "hält"
            case "verließst " : return "verließt"
            default : return verb
        }
    }

    create_board(board)

    document.addEventListener('click', function (event){
        if (event.target.tagName === 'DIV') {
            tar = get_tar("." + turn + "ish")
            input.value = tar.dataset.person
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
            check = checkIrreg(conjugate(...Object.values(verbs_list[v]),p,t))
            if (input.value.includes(check.trim())) {
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