document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container')
    const board = document.getElementById('board')
    const input = document.getElementById("input")
    let turn = "red"
    let wait = 0

    var german = {
        "template-sein" : {
            "präsens" : {
                "ich": "","wir": "",
                "du": "","ihr": "",
                "es": "","sie": ""
            },
            "präteritum" : {
                "ich": "","wir": "",
                "du": "","ihr": "",
                "es": "","sie": ""
            },
            "perfekt" : {
                "ich": "bin ","wir": "sind ",
                "du": "bist ","ihr": "seid ",
                "es": "ist ","sie": "sind "
            },
            "plusquamperfekt" : {
                "ich": "war ","wir": "waren ",
                "du": "warst ","ihr": "wart ",
                "es": "war ","sie": "waren "
            },
            "futur I" : {
                "ich": "werde ","wir": "werden ",
                "du": "wirst ","ihr": "werdet ",
                "es": "wird ","sie": "werden "
            },
            "futur II" : {
                "ich": "werde  sein","wir": "werden  sein",
                "du": "wirst  sein","ihr": "werdet  sein",
                "es": "wird  sein","sie": "werden  sein"
            }
        },
    
        "template-haben" : {
            "präsens" : {
                "ich": "","wir": "",
                "du": "","ihr": "",
                "es": "","sie": ""
            },
            "präteritum" : {
                "ich": "","wir": "",
                "du": "","ihr": "",
                "es": "","sie": ""
            },
            "perfekt" : {
                "ich": "habe ","wir": "haben ",
                "du": "hast ","ihr": "habt ",
                "es": "hat ","sie": "haben "
            },
            "plusquamperfekt" : {
                "ich": "hatte ","wir": "hatten ",
                "du": "hattest ","ihr": "hattet ",
                "es": "hatte ","sie": "hatten "
            },
            "futur I" : {
                "ich": "werde ","wir": "werden ",
                "du": "wirst ","ihr": "werdet ",
                "es": "wird ","sie": "werden "
            },
            "futur II" : {
                "ich": "werde  haben","wir": "werden  haben",
                "du": "wirst  haben","ihr": "werdet  haben",
                "es": "wird  haben","sie": "werden  haben"
            }
        },
    
        "verbs" : {
            "sein" : {
                "präsens" : {
                    "ich": "bin",   "wir": "sind",
                    "du": "bist",   "ihr": "seid",
                    "es": "ist",    "sie": "sind"
                },
                "präteritum" : {
                    "ich": "war",   "wir": "waren",
                    "du": "warst",  "ihr": "wart",
                    "es": "war",    "sie": "waren"
                },
                "perfekt" : {
                    "ich": "bin gewesen",   "wir": "sind gewesen",
                    "du": "bist gewesen",   "ihr": "seid gewesen",
                    "es": "ist gewesen",    "sie": "sind gewesen"
                },
                "plusquamperfekt" : {
                    "ich": "war gewesen",   "wir": "waren gewesen",
                    "du": "warst gewesen",  "ihr": "wart gewesen",
                    "es": "war gewesen",    "sie": "waren gewesen"
                },
                "futur I" : {
                    "ich": "werde sein",    "wir": "werden sein",
                    "du": "wirst sein",     "ihr": "werdet sein",
                    "es": "wird sein",      "sie": "werden sein"
                },
                "futur II" : {
                    "ich": "werde gewesen sein",    "wir": "werden gewesen sein",
                    "du": "wirst gewesen sein",     "ihr": "werdet gewesen sein",
                    "es": "wird gewesen sein",      "sie": "werden gewesen sein"
                }
            },
            "haben" : {
                "präsens" : {
                    "ich": "habe",  "wir": "haben",
                    "du": "hast",   "ihr": "habt",
                    "es": "hat",    "sie": "haben"
                },
                "präteritum" : {
                    "ich": "hatte",     "wir": "hatten",
                    "du": "hattest",    "ihr": "hattet",
                    "es": "hatte",      "sie": "hatten"
                },
                "perfekt" : {
                    "ich": "habe gehabt","wir": "haben gehabt",
                    "du": "hast gehabt","ihr": "habt gehabt",
                    "es": "hat gehabt","sie": "haben gehabt"
                },
                "plusquamperfekt" : {
                    "ich": "hatte gehabt","wir": "hatten gehabt",
                    "du": "hattest gehabt","ihr": "hattet gehabt",
                    "es": "hatte gehabt","sie": "hatten gehabt"
                },
                "futur I" : {
                    "ich": "werde haben","wir": "werden haben",
                    "du": "wirst haben","ihr": "werdet haben",
                    "es": "wird haben","sie": "werden haben"
                },
                "futur II" : {
                    "ich": "werde gehabt haben","wir": "werden gehabt haben",
                    "du": "wirst gehabt haben","ihr": "werdet gehabt haben",
                    "es": "wird gehabt haben","sie": "werden gehabt haben"
                },
            },
        }
    }

    /**
            "werden" : {},
            "kommen" : {},
            "ankommen" : {},
            "verlassen" : {},
            "fahren" : {},
            "halten" : {},
            "schlafen" : {},
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
            rand_word = Object.keys(german["verbs"])
            rand_tense = Object.keys(german["verbs"]["sein"])
            rand_person = Object.keys(german["verbs"]["sein"]["präsens"])
            rand_index_words = Math.floor(Math.random() * rand_word.length)
            rand_index_tenses = Math.floor(Math.random() * rand_tense.length)
            rand_index_persons = Math.floor(Math.random() * rand_person.length)
            string = rand_word[rand_index_words] + "<br /><br />" + rand_tense[rand_index_tenses]
            square.innerHTML = string
            square.dataset.verb = Object.keys(german["verbs"])[rand_index_words]
            square.dataset.tense = Object.keys(german["verbs"]["sein"])[rand_index_tenses]
            square.dataset.person = Object.keys(german["verbs"]["sein"]["präsens"])[rand_index_persons]
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
            console.log(german["verbs"][tar.dataset.verb][tar.dataset.tense][tar.dataset.person])
            if (input.value.includes(german["verbs"][tar.dataset.verb][tar.dataset.tense][tar.dataset.person])) {
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