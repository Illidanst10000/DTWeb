import knightLogo from '../../assets/icons/knight.png';
import bishopLogo from '../../assets/icons/bishop.png';
import assassinLogo from '../../assets/icons/assassin.png';
import assassinPersona from '../../assets/persones/img_86.png';
import lichLogo from '../../assets/icons/lich.png';
import lichPersona from '../../assets/persones/img_55.png';
import shadowLogo from '../../assets/icons/shadow.png';
import knightPersona from '../../assets/persones/img_0.png'

export const CharactersData: Record<string, any> = {
    "CHARACTER": {
        "Name": "",
        "Descript": "",
        "Hits": "",
        "DefenceBlow": 0,
        "DefenceShot": 0,
        "ProtectLife": 0,
        "ProtectDeath": 0,
        "ProtectElemental": 0,
        "Initiative": 0,
        "Manevres": 0,
        "Vampirizm": 0,
        "Regen": 0,
    },
    "Knight": {
        "GlobalIndex": 1,
        "Name": "Knight",
        "Descript": "Участник множества жестоких битв, Рыцарь обладает превосходным опытом ведения боя.",
        "IconIndex": knightLogo,
        "Persona": knightPersona,
        "Hits": 80,
        "AttackBlow": 45,
        "DefenceBlow": 15,
        "DefenceShot": 10,
        "ProtectLife": 15,
        "ProtectDeath": 15,
        "ProtectElemental": 15,
        "Initiative": 9,
        "Manevres": 1,
    },
    "Герой-архимаг": {
        "GlobalIndex": 2,
        "Name": "Архимаг",
        "Descript": "Архимаг способен обращаться к могущественным силам мирозданья, неподвластным простым людям.",
        "Magic": "ElementalMagic",
        "MagicDirection": "ToEnemy",
        "IconIndex": 76,
        "Hits": 50,
        "MagicPower": 25,
        "ProtectLife": 35,
        "ProtectDeath": 35,
        "ProtectElemental": 35,
        "Initiative": 26,
        "Manevres": 2,
    },
    "Герой-следопыт": {
        "GlobalIndex": 3,
        "Name": "Следопыт",
        "Descript": "Искусство срельбы дано Следопыту от бога, а знание природы наделяет его несломимой жизненной волей.",
        "IconIndex": 77,
        "Hits": 65,
        "AttackShot": 30,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 19,
        "Manevres": 2,
        "Regen": 5,
    },
    "Ополченец": {
        "GlobalIndex": 4,
        "Name": "Ополченец",
        "Descript": "Ополченцем становится рекрут, которому дали в руки копье и научили ходить стоем.",
        "IconIndex": 2,
        "NextUnit1": "Стражник",
        "NextUnit1Level": 1,
        "NextUnit2": "Пехотинец",
        "NextUnit2Level": 1,
        "Hits": 50,
        "AttackBlow": 25,
        "Initiative": 9,
        "Manevres": 1,
    },
    "Стражник": {
        "GlobalIndex": 5,
        "Name": "Стражник",
        "Descript": "Воин, достигший некоторых искуств в ратных делах, получает лучшую экипировку.",
        "IconIndex": 7,
        "Bonus": "SpearDefense",
        "NextUnit1": "Алебардист",
        "NextUnit1Level": 1,
        "NextUnit2": "Начальник стражи",
        "NextUnit2Level": 1,
        "Hits": 60,
        "AttackBlow": 40,
        "DefenceBlow": 5,
        "Initiative": 8,
        "Manevres": 1,

    },
    "Алебардист": {
        "GlobalIndex": 6,
        "Name": "Алебардист",
        "Descript": "Преуспев в воинской службе, алебардист изучил все хитрости своего страшного оружия, и прекрасно владеет им.",
        "IconIndex": 35,
        "Bonus": "SpearDefense",
        "NextUnit1": "Гвардеец",
        "NextUnit1Level": 1,
        "Hits": 75,
        "AttackBlow": 55,
        "DefenceBlow": 10,
        "DefenceShot": 5,
        "Initiative": 7,
        "Manevres": 1,

    },
    "Гвардеец": {
        "GlobalIndex": 7,
        "Name": "Гвардеец",
        "Descript": "Воин, прославившийся своим ратным умением, заслужил почетное призвание служить в императорской гвардии.",
        "IconIndex": 20,
        "Bonus": "SpearDefense",
        "Hits": 90,
        "AttackBlow": 70,
        "DefenceBlow": 15,
        "DefenceShot": 10,
        "Initiative": 6,
        "Manevres": 1,

    },
    "Пехотинец": {
        "GlobalIndex": 8,
        "Name": "Пехотинец",
        "Descript": "Пехотинец, вооруженный топором и щитом, является стартовой основой любого войска.",
        "IconIndex": 3,
        "NextUnit1": "Оруженосец",
        "NextUnit1Level": 1,
        "NextUnit2": "Дубинщик",
        "NextUnit2Level": 1,
        "Hits": 60,
        "AttackBlow": 35,
        "DefenceBlow": 5,
        "DefenceShot": 10,
        "Initiative": 9,
        "Manevres": 1,

    },
    "Оруженосец": {
        "GlobalIndex": 9,
        "Name": "Оруженосец",
        "Descript": "Оруженосец обучается воинскому искусству у рыцаря. Щит и меч - вот все, что нужно оруженосцу для победы.",
        "IconIndex": 5,
        "NextUnit1": "Воин-пилигрим",
        "NextUnit1Level": 1,
        "NextUnit2": "Мечник",
        "NextUnit2Level": 1,
        "NextUnit3": "Кирасир",
        "NextUnit3Level": 1,
        "Hits": 70,
        "AttackBlow": 45,
        "DefenceBlow": 10,
        "DefenceShot": 15,
        "Initiative": 12,
        "Manevres": 1,

    },
    "Воин-пилигрим": {
        "GlobalIndex": 10,
        "Name": "Воин-пилигрим",
        "Descript": "Воин-пилигрим - образец доблести и отваги. Он скитается по свету в поисках возможности ратного подвига.",
        "IconIndex": 13,
        "NextUnit1": "Паладин",
        "NextUnit1Level": 1,
        "Hits": 85,
        "AttackBlow": 55,
        "DefenceBlow": 15,
        "DefenceShot": 20,
        "Initiative": 13,
        "Manevres": 1,
        "d-ProtectElemental": 5
    },
    "Паладин": {
        "GlobalIndex": 11,
        "Name": "Паладин",
        "Descript": "Паладин - посвященный богом рыцарь, избранный для служения и защиты веры.",
        "Magic": "LifeMagic",
        "MagicDirection": "ToAlly",
        "IconIndex": 10,
        "Hits": 100,
        "AttackBlow": 65,
        "DefenceBlow": 20,
        "DefenceShot": 20,
        "ProtectLife": 15,
        "ProtectDeath": 15,
        "ProtectElemental": 15,
        "Initiative": 14,
        "Manevres": 1,
        "Regen": 5,
        "d-ProtectElemental": 2
    },
    "Мечник": {
        "GlobalIndex": 12,
        "Name": "Мечник",
        "Descript": "Оруженосец, завершивший обучение у рыцаря, и стремящийся приобрести дальнейший опыт на службе в армии.",
        "IconIndex": 0,
        "NextUnit1": "Мастер меча",
        "NextUnit1Level": 1,
        "Hits": 80,
        "AttackBlow": 45,
        "DefenceBlow": 10,
        "DefenceShot": 5,
        "Initiative": 14,
        "Manevres": 2,

    },
    "Мастер меча": {
        "GlobalIndex": 13,
        "Name": "Мастер меча",
        "Descript": "Мастер меча виртуозно владеет свои оружием, в готовности с немыслимой скоростью парировать любой удар врага.",

        "IconIndex": 21,
        "NextUnit1Level": 1,
        "Hits": 90,
        "AttackBlow": 50,
        "DefenceBlow": 15,
        "DefenceShot": 10,
        "Initiative": 16,
        "Manevres": 2,

    },
    "Кирасир": {
        "GlobalIndex": 14,
        "Name": "Кирасир",
        "Descript": "Кирасир - это элитный воин, избравший огромный двуручный меч своим любимым оружием.",

        "IconIndex": 12,
        "NextUnit1": "Рыцарь",
        "NextUnit1Level": 1,
        "Hits": 90,
        "AttackBlow": 60,
        "DefenceBlow": 15,
        "DefenceShot": 10,
        "Initiative": 12,
        "Manevres": 1,

    },
    "Рыцарь": {
        "GlobalIndex": 15,
        "Name": "Рыцарь",
        "Descript": "Участник множества жестоких битв, Рыцарь обладает превосходным опытом ведения боя.",

        "IconIndex": 43,
        "Hits": 110,
        "AttackBlow": 75,
        "DefenceBlow": 20,
        "DefenceShot": 15,
        "ProtectLife": 20,
        "ProtectDeath": 20,
        "ProtectElemental": 20,
        "Initiative": 13,
        "Manevres": 1,

        "d-ProtectElemental": 1
    },
    "Дубинщик": {
        "GlobalIndex": 16,
        "Name": "Дубинщик",
        "Descript": "Вместо меча дубинщик предпочитает булаву, которая наносит тяжелые удары даже сквозь броню врага.",

        "IconIndex": 4,
        "Bonus": "ArmorIgnore",
        "NextUnit1": "Воин с булавой",
        "NextUnit1Level": 1,
        "Hits": 70,
        "AttackBlow": 40,
        "DefenceBlow": 5,
        "DefenceShot": 10,
        "Initiative": 9,
        "Manevres": 1,

        "d-AttackBlow": 3
    },
    "Воин с булавой": {
        "GlobalIndex": 17,
        "Name": "Воин с булавой",
        "Descript": "Виртуозно владея буловой, этот воин не страшиться сражаться без  щита, причиняя врагу больший ущерб.",

        "IconIndex": 6,
        "Bonus": "ArmorIgnore",
        "NextUnit1": "Молотоборец",
        "NextUnit1Level": 1,
        "Hits": 85,
        "AttackBlow": 45,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 10,
        "Manevres": 1,

    },
    "Молотоборец": {
        "GlobalIndex": 18,
        "Name": "Молотоборец",
        "Descript": "Достигнув высот боевого мастерства, молотоборец берет в руки огромный шипастый молот.",

        "IconIndex": 34,
        "Bonus": "ArmorIgnore",
        "Hits": 100,
        "AttackBlow": 50,
        "DefenceBlow": 10,
        "DefenceShot": 5,
        "Initiative": 11,
        "Manevres": 1,

    },
    "Охотник": {
        "GlobalIndex": 19,
        "Name": "Охотник",
        "Descript": "Любой охотник, владеющий стрельбой из лука, может поступить на военную службу.",

        "IconIndex": 11,
        "NextUnit1": "Стрелок",
        "NextUnit1Level": 1,
        "Hits": 50,
        "AttackShot": 20,
        "Initiative": 16,
        "Manevres": 2,


    },
    "Стрелок": {
        "GlobalIndex": 20,
        "Name": "Стрелок",
        "Descript": "Стрелок - это наемный охотник, который регулярно тренируется на стрельбище.",

        "IconIndex": 83,
        "NextUnit1": "Снайпер",
        "NextUnit1Level": 1,
        "NextUnit2": "Лучник",
        "NextUnit2Level": 1,
        "NextUnit3": "Асасин",
        "NextUnit3Level": 1,
        "Hits": 60,
        "AttackShot": 30,
        "DefenceShot": 5,
        "Initiative": 18,
        "Manevres": 2,


    },
    "Лучник": {
        "GlobalIndex": 21,
        "Name": "Лучник",
        "Descript": "Стрелок, участвовавший во многих успешных боях, получает новую форму и право называться лучником.",

        "IconIndex": 54,
        "NextUnit1": "Егерь",
        "NextUnit1Level": 1,
        "Hits": 70,
        "AttackShot": 40,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 20,
        "Manevres": 2,


    },
    "Егерь": {
        "GlobalIndex": 22,
        "Name": "Егерь",
        "Descript": "Егерь - опытный и талантливый лучник, владеющий лучшей экипировкой и именным луком.",

        "IconIndex": 84,
        "Bonus": "Evasive",
        "Hits": 75,
        "AttackShot": 45,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 22,
        "Manevres": 2,


    },
    "Арбалетчик": {
        "GlobalIndex": 23,
        "Name": "Арбалетчик",
        "Descript": "Арбалетчику доверено мощное оружие. Слабость его в том, что перезарядка арбалета занимает много времени.",

        "IconIndex": 15,
        "Bonus": "ArmorIgnore",
        "Hits": 60,
        "AttackShot": 40,
        "DefenceBlow": 10,
        "DefenceShot": 5,
        "Initiative": 6,
        "Manevres": 1,


    },
    "Бомбардир": {
        "GlobalIndex": 24,
        "Name": "Бомбардир",
        "Descript": "Управляя самым мощным стрелковым оружием, бомбардир причиняет врагу невероятный ущерб.",

        "IconIndex": 9,
        "Bonus": "Artillery",
        "NextUnit1": "Пушкарь",
        "NextUnit1Level": 1,
        "Hits": 70,
        "AttackShot": 80,
        "DefenceBlow": 10,
        "DefenceShot": 10,
        "Initiative": 6,
        "Manevres": 1,

        "d-AttackShot": 10
    },
    "Пушкарь": {
        "GlobalIndex": 25,
        "Name": "Пушкарь",
        "Descript": "Канонир без пушки - это не канонир. А пушка - это царица полей. Вместе с пушкой канонир решает исход битвы.",

        "IconIndex": 16,
        "Bonus": "Artillery",
        "Hits": 80,
        "AttackShot": 100,
        "DefenceShot": 5,
        "Initiative": 3,
        "Manevres": 1,


    },
    "Послушница": {
        "GlobalIndex": 26,
        "Name": "Послушница",
        "Descript": "Девушка, поступающая в монастырь и исполняющая служение Богу, обретает дар целительства.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToAlly",
        "Surrender": 25,

        "IconIndex": 24,
        "NextUnit1": "Монашка",
        "NextUnit1Level": 1,
        "NextUnit2": "Колдунья",
        "NextUnit2Level": 1,
        "Hits": 45,
        "MagicPower": 15,
        "ProtectLife": 10,
        "ProtectDeath": 10,
        "ProtectElemental": 10,
        "Initiative": 20,
        "Manevres": 2,


        "d-ProtectElemental": 4
    },
    "Монашка": {
        "GlobalIndex": 27,
        "Name": "Монашка",
        "Descript": "Монашка знакома со всеми таинствами веры, благодаря чему она может благословить воинов и излечить их.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToAlly",
        "Surrender": 50,

        "IconIndex": 51,
        "NextUnit1": "Волшебница",
        "NextUnit1Level": 1,
        "NextUnit2": "Святая",
        "NextUnit2Level": 1,
        "Hits": 55,
        "MagicPower": 25,
        "ProtectLife": 20,
        "ProtectDeath": 20,
        "ProtectElemental": 20,
        "Initiative": 24,
        "Manevres": 2,
        "Regen": 20,


        "d-ProtectElemental": 5
    },
    "Волшебница": {
        "GlobalIndex": 28,
        "Name": "Волшебница",
        "Descript": "Волшебница умеет повелевать стихиями. Кроме исцеления, ее волшебство наделяет невероятной быстротой.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToAlly",
        "Surrender": 50,

        "IconIndex": 26,
        "Hits": 65,
        "MagicPower": 35,
        "ProtectLife": 25,
        "ProtectDeath": 25,
        "ProtectElemental": 40,
        "Initiative": 30,
        "Manevres": 2,
        "Regen": 25,


    },
    "Святая": {
        "GlobalIndex": 29,
        "Name": "Святая",
        "Descript": "Святая - великая целительница и лекарь. Она вырвет вас из лап смерти даже тогда, кода другие отступят.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToAlly",
        "Surrender": 75,

        "IconIndex": 28,
        "Hits": 65,
        "MagicPower": 35,
        "ProtectLife": 30,
        "ProtectDeath": 30,
        "ProtectElemental": 30,
        "Initiative": 28,
        "Manevres": 2,
        "Regen": 25,


    },
    "Паломник": {
        "GlobalIndex": 30,
        "Name": "Паломник",
        "Descript": "Пилигрим проводит свои дни в странствиях. Урепив свой разум и веру, он изгоняет зло молитвой.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToEnemy",
        "Surrender": 20,

        "IconIndex": 17,
        "Bonus": "ArmyMedic",
        "NextUnit1": "Монах",
        "NextUnit1Level": 1,
        "NextUnit2": "Знахарь",
        "NextUnit2Level": 1,
        "Hits": 50,
        "MagicPower": 10,
        "ProtectLife": 15,
        "ProtectDeath": 15,
        "ProtectElemental": 15,
        "Initiative": 20,
        "Manevres": 2,

        "d-MagicPower": 3
    },
    "Монах": {
        "GlobalIndex": 31,
        "Name": "Монах",
        "Descript": "В минуту опастности монах берет в руки цеп и с именем господа защищают свою землю, не скупясь на проклятия врагу.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToEnemy",

        "IconIndex": 18,
        "Bonus": "ArmyMedic",
        "NextUnit1": "Боевой монах",
        "NextUnit1Level": 1,
        "NextUnit2": "Священник",
        "NextUnit2Level": 1,
        "Hits": 60,
        "AttackBlow": 20,
        "MagicPower": 15,
        "ProtectLife": 20,
        "ProtectDeath": 20,
        "ProtectElemental": 20,
        "Initiative": 22,
        "Manevres": 2,

    },
    "Священник": {
        "GlobalIndex": 32,
        "Name": "Священник",
        "Descript": "Священник ревностно следит за чистотой веры, призывая гнев господа на еретиков и преступников.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToEnemy",
        "Surrender": 50,

        "IconIndex": 68,
        "Bonus": "ArmyMedic",
        "NextUnit1": "Епископ",
        "NextUnit1Level": 1,
        "Hits": 70,
        "MagicPower": 25,
        "ProtectLife": 35,
        "ProtectDeath": 50,
        "ProtectElemental": 35,
        "Initiative": 24,
        "Manevres": 2,


    },
    "Bishop": {
        "GlobalIndex": 33,
        "Name": "Bishop",
        "Descript": "Благославленный богом, епископ изгоняет любые проявления зла, спасая души живых и возвращая покой мертвым.",
        "Magic": "LifeMagic",
        "MagicDirection": "ToEnemy",
        "Surrender": 100,
        "IconIndex": bishopLogo,
        "Bonus": "ArmyMedic",
        "Hits": 80,
        "MagicPower": 35,
        "ProtectLife": 45,
        "ProtectDeath": 80,
        "ProtectElemental": 45,
        "Initiative": 26,
        "Manevres": 2,
        "Regen": 10,


    },
    "Боевой монах": {
        "GlobalIndex": 34,
        "Name": "Боевой монах",
        "Descript": "Воинствующий монах стал на путь войны с ересью и нежитью. Его молитва - боевой цеп, а келья - железный панцирь.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToAlly",

        "IconIndex": 19,
        "NextUnit1": "Церковный страж",
        "NextUnit1Level": 1,
        "Hits": 70,
        "AttackBlow": 25,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "MagicPower": 15,
        "ProtectLife": 50,
        "ProtectDeath": 50,
        "ProtectElemental": 50,
        "Initiative": 18,
        "Manevres": 2,


    },
    "Церковный страж": {
        "GlobalIndex": 35,
        "Name": "Церковный страж",
        "Descript": "Церковный страж охраняет святые места, и любой, кто посягнет на него злой волей, познает кару господню.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 8,
        "Bonus": "GodAnger",
        "NextUnit1": "Инквизитор",
        "NextUnit1Level": 1,
        "Hits": 75,
        "AttackBlow": 25,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "ProtectLife": 65,
        "ProtectDeath": 65,
        "ProtectElemental": 65,
        "Initiative": 16,
        "Manevres": 2,
        "Regen": 10,

    },
    "Инквизитор": {
        "GlobalIndex": 36,
        "Name": "Инквизитор",
        "Descript": "Следуя заветам святых, инквизитор ищет и уничтожает неверных, неся на своем мече гнев господа.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 57,
        "Bonus": "GodStrike",
        "Hits": 80,
        "AttackBlow": 30,
        "DefenceBlow": 10,
        "DefenceShot": 10,
        "ProtectLife": 80,
        "ProtectDeath": 80,
        "ProtectElemental": 80,
        "Initiative": 14,
        "Manevres": 2,
        "Regen": 15,

    },
    "Знахарь": {
        "GlobalIndex": 37,
        "Name": "Знахарь",
        "Descript": "Знахарь - начинающий колдун, способный увеличить быстроту реакции любого воина, но на короткое время.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToEnemy",
        "Surrender": 15,

        "IconIndex": 49,
        "Bonus": "ArmyMedic",
        "NextUnit1": "Волшебник",
        "NextUnit1Level": 1,
        "Hits": 60,
        "MagicPower": 20,
        "ProtectLife": 20,
        "ProtectDeath": 20,
        "ProtectElemental": 20,
        "Initiative": 26,
        "Manevres": 2,


    },
    "Волшебник": {
        "GlobalIndex": 38,
        "Name": "Волшебник",
        "Descript": "Волшебник способен прикоснуться магией к любому воину в битве, помогая друзьям и препятствуя врагу.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToEnemy",
        "Surrender": 40,

        "IconIndex": 1,
        "Bonus": "ArmyMedic",
        "NextUnit1": "Архимаг",
        "NextUnit1Level": 1,
        "Hits": 70,
        "MagicPower": 30,
        "ProtectLife": 40,
        "ProtectDeath": 40,
        "ProtectElemental": 60,
        "Initiative": 28,
        "Manevres": 2,


    },
    "Архимаг": {
        "GlobalIndex": 39,
        "Name": "Архимаг",
        "Descript": "Архимаг обращается к могущественным силам мирозданья, воодушевляя героев на подвиги.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToEnemy",
        "Surrender": 60,

        "IconIndex": 40,
        "Hits": 80,
        "MagicPower": 45,
        "ProtectLife": 60,
        "ProtectDeath": 60,
        "ProtectElemental": 80,
        "Initiative": 30,
        "Manevres": 2,
        "Regen": 10,


    },
    "Кавалерист": {
        "GlobalIndex": 40,
        "Name": "Кавалерист",
        "Descript": "Стремительный всадник, перед атакой которого невозможно устоять, является основой любого конного войска.",

        "IconIndex": 32,
        "Bonus": "HorseAttack",
        "NextUnit1": "Конный Сержант",
        "NextUnit1Level": 1,
        "Hits": 120,
        "AttackBlow": 40,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 20,
        "Manevres": 1,

    },
    "Конный Сержант": {
        "GlobalIndex": 41,
        "Name": "Конный Сержант",
        "Descript": "Конный сержант несется в битву вслед за Конным Рыцарем, глубоко врезаясь в ряды противника.",

        "IconIndex": 53,
        "Bonus": "HorseAttack",
        "NextUnit1": "Конный Рыцарь",
        "NextUnit1Level": 1,
        "Hits": 140,
        "AttackBlow": 65,
        "DefenceBlow": 10,
        "DefenceShot": 10,
        "Initiative": 18,
        "Manevres": 1,

    },
    "Конный Рыцарь": {
        "GlobalIndex": 42,
        "Name": "Конный Рыцарь",
        "Descript": "Конный рыцарь является универсальной ударной силой любого самого современного и оснащенного войска.",

        "IconIndex": 70,
        "Bonus": "HorseAttack",
        "Hits": 160,
        "AttackBlow": 90,
        "DefenceBlow": 20,
        "DefenceShot": 15,
        "Initiative": 18,
        "Manevres": 1,

    },
    "Мертвяк": {
        "GlobalIndex": 43,
        "Name": "Мертвяк",
        "Descript": "Мертвяк - бездушное тело, поднятое из могилы силами некромантов.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 39,
        "Bonus": "Dead",
        "NextUnit1": "Мертвый воин",
        "NextUnit1Level": 1,
        "Hits": 60,
        "AttackBlow": 25,
        "DefenceBlow": 5,
        "ProtectDeath": 40,
        "ProtectElemental": 20,
        "Initiative": 6,
        "Manevres": 1,
        "Regen": 10,

    },
    "Мертвый воин": {
        "GlobalIndex": 44,
        "Name": "Мертвый воин",
        "Descript": "Некроманты наделяют смертоносной волей тело непогребенного воина, заставляя его служить своим злым целям.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 56,
        "Bonus": "Dead",
        "NextUnit1": "Мертвый вождь",
        "NextUnit1Level": 1,
        "Hits": 90,
        "AttackBlow": 35,
        "DefenceBlow": 10,
        "DefenceShot": 5,
        "ProtectDeath": 40,
        "ProtectElemental": 20,
        "Initiative": 7,
        "Manevres": 1,
        "Regen": 10,

    },
    "Мертвый вождь": {
        "GlobalIndex": 45,
        "Name": "Мертвый вождь",
        "Descript": "Тело мертвого вождя древности, заточенного в заброшенном склепе, стало вместилищем злых демонов.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 30,
        "Bonus": "Dead",
        "Hits": 120,
        "AttackBlow": 45,
        "DefenceBlow": 15,
        "DefenceShot": 10,
        "ProtectDeath": 40,
        "ProtectElemental": 20,
        "Initiative": 8,
        "Manevres": 1,
        "Regen": 10,

    },
    "Рыцарь смерти": {
        "GlobalIndex": 46,
        "Name": "Рыцарь смерти",
        "Descript": "В прошлом могучий воитель, поддавшийся демоническим чарам, после смерти стал чудовищной марионеткой сил зла.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 48,
        "Bonus": "FastDead",
        "Hits": 140,
        "AttackBlow": 60,
        "DefenceBlow": 15,
        "DefenceShot": 15,
        "ProtectLife": 15,
        "ProtectDeath": 60,
        "ProtectElemental": 25,
        "Initiative": 18,
        "Manevres": 1,
        "Vampirizm": 15,

        "d-ProtectElemental": 3
    },
    "Упырь": {
        "GlobalIndex": 47,
        "Name": "Упырь",
        "Descript": "Обезумевший нищий, одержимый демонами, пожирает свежие трупы, пытаясь насытить свой голод.",

        "IconIndex": 75,
        "Bonus": "ArmorIgnore",
        "NextUnit1": "Вурдалак",
        "NextUnit1Level": 1,
        "Hits": 80,
        "AttackBlow": 15,
        "DefenceShot": 5,
        "ProtectLife": 20,
        "ProtectDeath": 30,
        "ProtectElemental": 20,
        "Initiative": 18,
        "Manevres": 2,
        "Vampirizm": 30,

    },
    "Вампир": {
        "GlobalIndex": 48,
        "Name": "Вампир",
        "Descript": "Продавший жизнь и душу темным силам, вампир теряет свою человеческую сущность, черпая силу из крови живых.",

        "IconIndex": 47,
        "Bonus": "VampirsGist",
        "NextUnit1": "Носферату",
        "NextUnit1Level": 1,
        "Hits": 100,
        "AttackBlow": 30,
        "DefenceShot": 5,
        "ProtectLife": 20,
        "ProtectDeath": 30,
        "ProtectElemental": 20,
        "Initiative": 24,
        "Manevres": 2,
        "Vampirizm": 50,

    },
    "Носферату": {
        "GlobalIndex": 49,
        "Name": "Носферату",
        "Descript": "Носферату провел столетья в изучении мистической демонологии, став сильнейшим из вампиров.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 47,
        "Bonus": "OldVampirsGist",
        "Hits": 120,
        "AttackBlow": 45,
        "DefenceBlow": 10,
        "DefenceShot": 5,
        "ProtectLife": 20,
        "ProtectDeath": 30,
        "ProtectElemental": 20,
        "Initiative": 30,
        "Manevres": 2,
        "Vampirizm": 80,

    },
    "Вампирша": {
        "GlobalIndex": 50,
        "Name": "Вампирша",
        "Descript": "Колдунья, поддавшаяся искушению жить вечно, заключает договор с вампирами, помогая им в охоте за живой добычей.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToEnemy",

        "IconIndex": 59,
        "Bonus": "Evasive",
        "Hits": 60,
        "DefenceShot": 10,
        "MagicPower": 25,
        "ProtectLife": 30,
        "ProtectDeath": 30,
        "ProtectElemental": 30,
        "Initiative": 26,
        "Manevres": 3,
        "Vampirizm": 50,
        "d-Hits": 5
    },
    "Shadow": {
        "GlobalIndex": 51,
        "Name": "Shadow",
        "Descript": "Бесплотная тень блуждающая в потьмах, веет могильным холодом, леденя кровь в жилах.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToEnemy",

        "IconIndex": shadowLogo,
        "Bonus": "Ghost",
        "NextUnit1": "Дух",
        "NextUnit1Level": 1,
        "Hits": 10,
        "MagicPower": 35,
        "ProtectLife": 20,
        "ProtectDeath": 20,
        "ProtectElemental": 20,
        "Initiative": 24,
        "Manevres": 1,

        "d-ProtectElemental": 5
    },
    "Дух": {
        "GlobalIndex": 52,
        "Name": "Дух",
        "Descript": "Неупокоенный дух, вызывающий оцепенение и влекущий за собой в темные глубины смерти.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToEnemy",

        "IconIndex": 73,
        "Bonus": "Ghost",
        "NextUnit1": "Призрак",
        "NextUnit1Level": 1,
        "Hits": 15,
        "MagicPower": 40,
        "ProtectLife": 50,
        "ProtectDeath": 50,
        "ProtectElemental": 50,
        "Initiative": 26,
        "Manevres": 2,

        "d-ProtectElemental": 5
    },
    "Призрак": {
        "GlobalIndex": 53,
        "Name": "Призрак",
        "Descript": "Ужасающий посланец мира мертвых, парализующий взглядом и отбирающий жизнь всякого, кто вступит с ним в поединок.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToEnemy",

        "IconIndex": 74,
        "Bonus": "Ghost",
        "Hits": 20,
        "MagicPower": 45,
        "ProtectLife": 80,
        "ProtectDeath": 80,
        "ProtectElemental": 80,
        "Initiative": 28,
        "Manevres": 3,

        "d-ProtectElemental": 5
    },
    "Еретик": {
        "GlobalIndex": 54,
        "Name": "Еретик",
        "Descript": "Отринувший бога, еретик предается запретным плодам темных знаний, мечтая о власти и богатстве.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAlly",

        "IconIndex": 64,
        "NextUnit1": "Некромант",
        "NextUnit1Level": 1,
        "NextUnit2": "Ересиарх",
        "NextUnit2Level": 1,
        "Hits": 65,
        "AttackBlow": 15,
        "MagicPower": 20,
        "ProtectLife": 20,
        "ProtectDeath": 45,
        "ProtectElemental": 45,
        "Initiative": 18,
        "Manevres": 2,


    },
    "Некролит": {
        "GlobalIndex": 55,
        "Name": "Некролит",
        "Descript": "Начинающий позновать таинства темной стороны некролит, эксперементирует со смертью, разрушая своими ритуалами жизнь вокруг себя.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 41,
        "Bonus": "Evasive",
        "NextUnit1": "Некромант",
        "NextUnit1Level": 1,
        "Hits": 80,
        "MagicPower": 40,
        "ProtectLife": 20,
        "ProtectDeath": 45,
        "ProtectElemental": 45,
        "Initiative": 20,
        "Manevres": 2,
        "Vampirizm": 10,


    },
    "Lich": {
        "GlobalIndex": 56,
        "Name": "Lich",
        "Descript": "Достигший высшего знания, некромант перерождается, умирая в своей плоти и обретая еще более страшную силу.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": lichLogo,
        "Persona": lichPersona,
        "Bonus": "Unvulnerabe",
        "NextUnit1": "Архилич",
        "NextUnit1Level": 1,
        "Hits": 50,
        "MagicPower": 60,
        "ProtectLife": 60,
        "ProtectDeath": 80,
        "ProtectElemental": 80,
        "Initiative": 20,
        "Manevres": 2,
        "Vampirizm": 30,


    },
    "Ересиарх": {
        "GlobalIndex": 57,
        "Name": "Ересиарх",
        "Descript": "Ересиарх досконально изучил законы загробного мира, и теперь властвует над мертвой плотью, вдыхая в нее силу.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAlly",

        "IconIndex": 65,
        "NextUnit1": "Дьяволист",
        "NextUnit1Level": 1,
        "Hits": 75,
        "AttackBlow": 20,
        "MagicPower": 30,
        "ProtectLife": 20,
        "ProtectDeath": 45,
        "ProtectElemental": 45,
        "Initiative": 20,
        "Manevres": 2,


    },
    "Дьяволист": {
        "GlobalIndex": 58,
        "Name": "Дьяволист",
        "Descript": "Дьяволист обещал вечно служить демонам, получив взамен силу собирать вокруг себя мертвые воинства.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAlly",

        "IconIndex": 60,
        "Hits": 85,
        "AttackBlow": 25,
        "MagicPower": 40,
        "ProtectLife": 20,
        "ProtectDeath": 45,
        "ProtectElemental": 45,
        "Initiative": 22,
        "Manevres": 2,


    },
    "Нищий": {
        "GlobalIndex": 59,
        "Name": "Нищий",
        "Descript": "Обыкновенный нищий, что ходит по дорогам и попрошайничает.",

        "IconIndex": 69,
        "Bonus": "Counterblow",
        "NextUnit1": "Злодей",
        "NextUnit1Level": 3,
        "NextUnit2": "Убийца",
        "NextUnit2Level": 3,
        "NextUnit3": "Браконьер",
        "NextUnit3Level": 3,
        "Hits": 40,
        "AttackBlow": 15,
        "Initiative": 11,
        "Manevres": 1,

        "d-AttackBlow": 3
    },
    "Крестьянин": {
        "GlobalIndex": 60,
        "Name": "Крестьянин",
        "Descript": "Крестьянин - труженик земли. Он копается в поле, и за счет этого кормит благородных людей - феодалов.",

        "IconIndex": 55,
        "Hits": 50,
        "AttackBlow": 20,
        "Initiative": 7,
        "Manevres": 1,

        "d-AttackBlow": 3
    },
    "Староста": {
        "GlobalIndex": 61,
        "Name": "Староста",
        "Descript": "Самые достойные из крестьян выбираются на роль старосты. Обычно они проводят время в таверне.",

        "IconIndex": 52,
        "Hits": 60,
        "AttackBlow": 25,
        "Initiative": 3,
        "Manevres": 1,
        "Regen": 5,

    },
    "Бандит": {
        "GlobalIndex": 62,
        "Name": "Бандит",
        "Descript": "Крестьянский мужик, найдя старый меч, вышел на большую дорогу, чтобы пошарить по чужим карманам.",

        "IconIndex": 25,
        "Hits": 55,
        "AttackBlow": 30,
        "Initiative": 9,
        "Manevres": 1,

    },
    "Атаманша": {
        "GlobalIndex": 63,
        "Name": "Атаманша",
        "Descript": "В прошлом неплохая колдунья, не сумевшая завершить обучение. Предпочитая легкий хлеб, она занимается разбоем.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToEnemy",

        "IconIndex": 33,
        "Hits": 50,
        "MagicPower": 25,
        "ProtectLife": 10,
        "ProtectElemental": 20,
        "Initiative": 18,
        "Manevres": 2,


    },
    "Убийца": {
        "GlobalIndex": 64,
        "Name": "Убийца",
        "Descript": "Работник гильдии наемных убийц, прославившийся в своих темных делах.",

        "IconIndex": 36,
        "Bonus": "ArmorIgnore",
        "Hits": 60,
        "AttackBlow": 25,
        "DefenceBlow": 10,
        "DefenceShot": 10,
        "ProtectLife": 10,
        "ProtectDeath": 10,
        "ProtectElemental": 10,
        "Initiative": 20,
        "Manevres": 2,

    },
    "Грабитель": {
        "GlobalIndex": 65,
        "Name": "Грабитель",
        "Descript": "Обычные грабители обходятся простым копьем. Этого им хватает, что бы напугать и обобрать прохожего.",

        "IconIndex": 37,
        "Bonus": "SpearDefense",
        "Hits": 60,
        "AttackBlow": 30,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 9,
        "Manevres": 1,

    },
    "Разбойник": {
        "GlobalIndex": 66,
        "Name": "Разбойник",
        "Descript": "Если вдруг золото отяготит ваш карман, разбойник всегда поможет вам в этой беде.",

        "IconIndex": 38,
        "Hits": 65,
        "AttackBlow": 35,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 14,
        "Manevres": 1,

    },
    "Разбойница": {
        "GlobalIndex": 67,
        "Name": "Разбойница",
        "Descript": "В компании со своими товарищами, разбойница всегда готова избавить вас от тяжести вашего кошелька.",

        "IconIndex": 63,
        "Bonus": "Evasive",
        "Hits": 55,
        "AttackShot": 25,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 18,
        "Manevres": 2,


    },
    "Мародер": {
        "GlobalIndex": 68,
        "Name": "Мародер",
        "Descript": "Мародер не обременен условностями, и если где-то что-то лежит, то он заберет это себе, не смотря на обстоятельства.",

        "IconIndex": 61,
        "Bonus": "Evasive",
        "Hits": 70,
        "AttackBlow": 45,
        "DefenceBlow": 10,
        "DefenceShot": 10,
        "Initiative": 15,
        "Manevres": 1,

    },
    "Лжерыцарь": {
        "GlobalIndex": 69,
        "Name": "Лжерыцарь",
        "Descript": "Лжерыцари преступили рыцарские кодексы и законы, за что были лишены дворянских прав и земельных владений.",

        "IconIndex": 62,
        "Hits": 100,
        "AttackBlow": 85,
        "DefenceBlow": 20,
        "DefenceShot": 20,
        "Initiative": 14,
        "Manevres": 1,

    },
    "Лорд изменник": {
        "GlobalIndex": 70,
        "Name": "Лорд изменник",
        "Descript": "Объявленый вне закона лорд-феодал, нарушивший свою клятву сюзерену в корыстных целях.",

        "IconIndex": 66,
        "Hits": 100,
        "AttackBlow": 60,
        "DefenceBlow": 25,
        "DefenceShot": 15,
        "Initiative": 18,
        "Manevres": 2,

    },
    "Святой брат": {
        "GlobalIndex": 71,
        "Name": "Святой брат",
        "Descript": "Cельский священник, который заботится о возвращении разбойников на путь истиный, и сопровождает их повсюду.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToAll",
        "Surrender": 20,

        "IconIndex": 67,
        "Hits": 65,
        "MagicPower": 25,
        "ProtectLife": 20,
        "ProtectDeath": 20,
        "ProtectElemental": 20,
        "Initiative": 20,
        "Manevres": 2,


    },
    "Король": {
        "GlobalIndex": 72,
        "Name": "Король",
        "Descript": "Великий и мудрый повелитель, в прошлом великий воин. По его слову начинались войны и заключались мирные договора.",

        "IconIndex": 23,
        "Hits": 50,
        "AttackBlow": 45,
        "ProtectLife": 10,
        "ProtectDeath": 10,
        "ProtectElemental": 10,
        "Initiative": 6,
        "Manevres": 2,

    },
    "Принцесса": {
        "GlobalIndex": 73,
        "Name": "Принцесса",
        "Descript": "Прекрасное и избалованное создание. Ничего не умеет, но очень много хочет.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToAll",
        "Surrender": 50,

        "IconIndex": 22,
        "Hits": 40,
        "MagicPower": 10,
        "ProtectLife": 10,
        "ProtectDeath": 10,
        "ProtectElemental": 10,
        "Initiative": 3,
        "Manevres": 2,


    },
    "Идальго": {
        "GlobalIndex": 74,
        "Name": "Идальго",
        "Descript": "Благородный дворянин, слишком утонченный для того, что бы надеть на себя груду железа и пойти совершать подвиги.",

        "IconIndex": 29,
        "Hits": 60,
        "AttackBlow": 35,
        "Initiative": 12,
        "Manevres": 2,

    },
    "Купец": {
        "GlobalIndex": 75,
        "Name": "Купец",
        "Descript": "Купец - знает, где, что и по чем продать или купить. При решении финансовых проблем он незаменим.",

        "Surrender": 15,

        "IconIndex": 27,
        "Bonus": "Merchant",
        "Hits": 50,
        "AttackBlow": 15,
        "Initiative": 9,
        "Manevres": 1,

    },
    "Аббат": {
        "GlobalIndex": 76,
        "Name": "Аббат",
        "Descript": "Преданный служитель монастыря, аббат заботиться о просвещении и благоденствии прихожан.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToAll",
        "Surrender": 70,

        "IconIndex": 79,
        "Bonus": "ArmyMedic",
        "Hits": 65,
        "MagicPower": 70,
        "ProtectLife": 20,
        "ProtectDeath": 20,
        "ProtectElemental": 20,
        "Initiative": 15,
        "Manevres": 1,
        "d-Hits": 5
    },
    "Проклятый рыцарь": {
        "GlobalIndex": 77,
        "Name": "Проклятый рыцарь",
        "Descript": "Рыцарь поддавшийся соблазнам сил зла, творит зло и беззаконие, ради накопления богатств и укрепления своей власти.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 71,
        "Bonus": "ArmorIgnore",
        "Hits": 90,
        "AttackBlow": 45,
        "DefenceBlow": 15,
        "DefenceShot": 15,
        "MagicPower": 25,
        "Initiative": 15,
        "Manevres": 2,

    },
    "Горожанка": {
        "GlobalIndex": 78,
        "Name": "Горожанка",
        "Descript": "Жительница большого города. В прошлом крестьянка, теперь уличная торговка.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToAll",
        "Surrender": 15,

        "IconIndex": 78,
        "Bonus": "Merchant",
        "Hits": 45,
        "Initiative": 6,
        "Manevres": 1,


    },
    "Дворянская дочь": {
        "GlobalIndex": 91,
        "Name": "Дворянская дочь",
        "Descript": "Прекрастная леди, знающая себе цену. На ее счету ни одно разбитое сердце...",

        "Magic": "DeathMagic",
        "MagicDirection": "ToEnemy",
        "Surrender": 15,

        "IconIndex": 87,
        "Hits": 40,
        "MagicPower": 15,
        "Initiative": 10,
        "Manevres": 2,


    },
    "Лесной бандит": {
        "GlobalIndex": 80,
        "Name": "Лесной бандит",
        "Descript": "Лесной бандит предпочитает работать в лесу, где никто не заметит откуда прилетела его стрела.",

        "IconIndex": 81,
        "Bonus": "HorseAttack",
        "Hits": 75,
        "AttackShot": 35,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 24,
        "Manevres": 2,


    },
    "Начальник стражи": {
        "GlobalIndex": 81,
        "Name": "Начальник стражи",
        "Descript": "Начальник стражи знает все закоулки и щели свого замка, чем и пользуется - как во время осады, так и в мирное время.",

        "IconIndex": 31,
        "Bonus": "Garrison",
        "Hits": 65,
        "AttackBlow": 25,
        "DefenceBlow": 7,
        "DefenceShot": 7,
        "Initiative": 13,
        "Manevres": 1,

    },
    "Викинг": {
        "GlobalIndex": 82,
        "Name": "Викинг",
        "Descript": "Защищенный верой в языческих богов, викинг участвует в набегах на цивилизованные страны.",

        "IconIndex": 58,
        "Bonus": "ArmorIgnore",
        "Hits": 70,
        "AttackBlow": 40,
        "DefenceBlow": 10,
        "DefenceShot": 20,
        "ProtectLife": 50,
        "ProtectDeath": 50,
        "ProtectElemental": 50,
        "Initiative": 18,
        "Manevres": 1,

    },
    "Колдунья": {
        "GlobalIndex": 83,
        "Name": "Колдунья",
        "Descript": "Изучив таинства анафемы, колдунья становится незаменимой если нужно ослабить и поразить врага.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",
        "Surrender": 15,

        "IconIndex": 44,
        "NextUnit1": "Ведьма",
        "Hits": 55,
        "MagicPower": 40,
        "ProtectLife": 15,
        "ProtectDeath": 15,
        "ProtectElemental": 15,
        "Initiative": 20,
        "Manevres": 2,


    },
    "Ведьма": {
        "GlobalIndex": 84,
        "Name": "Ведьма",
        "Descript": "Зная все тонкости проклятий и боевой магии, ведьма является опасным противником на поле боя.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",
        "Surrender": 30,

        "IconIndex": 45,
        "Hits": 65,
        "MagicPower": 60,
        "ProtectLife": 35,
        "ProtectDeath": 35,
        "ProtectElemental": 35,
        "Initiative": 20,
        "Manevres": 2,


    },
    "Культист": {
        "GlobalIndex": 85,
        "Name": "Культист",
        "Descript": "Последователь тайного культа, который посвятил свою жизнь борьбе с неверными.",

        "IconIndex": 82,
        "Bonus": "Poison",
        "Hits": 60,
        "AttackBlow": 20,
        "Initiative": 20,
        "Manevres": 2,

    },
    "Снайпер": {
        "GlobalIndex": 86,
        "Name": "Снайпер",
        "Descript": "Снайпер - самый меткий лучник в войске. Что бы защитить его в бою, его снаряжают кожанными доспехами и шлемом.",

        "IconIndex": 14,
        "Bonus": "ArmorIgnore",
        "Hits": 65,
        "AttackShot": 40,
        "DefenceBlow": 10,
        "DefenceShot": 10,
        "Initiative": 10,
        "Manevres": 2,

    },
    "Assassin": {
        "GlobalIndex": 87,
        "Name": "Assassin",
        "Descript": "Специально обученные стрелки-асасины нередко решают исход битвы при помощи своего оружия.",

        "IconIndex": assassinLogo,
        "Persona": assassinPersona,
        "Bonus": "Poison",
        "Hits": 65,
        "AttackShot": 35,
        "DefenceShot": 5,
        "Initiative": 20,
        "Manevres": 2,
        "Regen": 10,

    },
    "Злодей": {
        "GlobalIndex": 88,
        "Name": "Злодей",
        "Descript": "Истиные злодеи, обуреваемые жаждой творить зло, бросаются в бой как настоящие берсерки.",

        "IconIndex": 86,
        "Bonus": "HorseAttack",
        "Hits": 90,
        "AttackBlow": 40,
        "Initiative": 18,
        "Manevres": 1,

    },
    "Атаман": {
        "GlobalIndex": 89,
        "Name": "Атаман",
        "Descript": "Любой уважающий себя атаман, любит приукрасить свой костюм, что бы не потерять лицо перед бандой.",

        "IconIndex": 85,
        "Hits": 90,
        "AttackBlow": 70,
        "DefenceBlow": 15,
        "DefenceShot": 10,
        "Initiative": 12,
        "Manevres": 1,

    },
    "Яростный дух": {
        "GlobalIndex": 92,
        "Name": "Яростный дух",
        "Descript": "Яростный дух, с призрачным мечом, вернулся в этот мир, что бы мстить.",

        "Magic": "ElementalMagic",
        "MagicDirection": "ToEnemy",

        "IconIndex": 89,
        "Bonus": "Ghost",
        "Hits": 20,
        "AttackBlow": 20,
        "ProtectLife": 50,
        "ProtectDeath": 50,
        "ProtectElemental": 50,
        "Initiative": 25,
        "Manevres": 3,
        "Vampirizm": 10,

    },
    "Чародейка": {
        "GlobalIndex": 93,
        "Name": "Чародейка",
        "Descript": "За годы магической практики привыкла, что по щелчку пальцев враги сами укладываются в штабеля. Если враги вдруг случайно не в курсе, бьет им по ушам метелкой.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 90,
        "Bonus": "HorseAttack",
        "Hits": 55,
        "AttackBlow": 5,
        "MagicPower": 35,
        "ProtectLife": 20,
        "ProtectDeath": 20,
        "ProtectElemental": 20,
        "Initiative": 22,
        "Manevres": 2,


    },
    "Лучница": {
        "GlobalIndex": 94,
        "Name": "Лучница",
        "Descript": "Дева-воительница, предпочитающая охоту и лук в руках, рукоделию и вышиванию. Благодаря врожденной ловкости стреляет быстро, но увы не сильно.",

        "IconIndex": 91,
        "Bonus": "HorseAttack",
        "Hits": 40,
        "AttackShot": 20,
        "Initiative": 25,
        "Manevres": 3,

    },
    "Браконьер": {
        "GlobalIndex": 95,
        "Name": "Браконьер",
        "Descript": "Браконьеры - опытные охотники, которые не боятся встретится в лесу ни с диким зверемь, ни с егерями феодалов.",

        "IconIndex": 92,
        "Hits": 60,
        "AttackShot": 30,
        "DefenceBlow": 5,
        "DefenceShot": 5,
        "Initiative": 21,
        "Manevres": 2,


    },
    "Вурдалак": {
        "GlobalIndex": 96,
        "Name": "Вурдалак",
        "Descript": "Продавший свою душу силам зла и смерти, вурдалак превращается в монстра, охотясь за живыми в слепой жажде крови.",
        "IconIndex": 93,
        "Bonus": "VampirsGist",
        "NextUnit1": "Вампир",
        "NextUnit1Level": 1,
        "Hits": 100,
        "AttackBlow": 20,
        "DefenceShot": 5,
        "ProtectLife": 20,
        "ProtectDeath": 30,
        "ProtectElemental": 20,
        "Initiative": 21,
        "Manevres": 2,
        "Vampirizm": 40,
    },
    "Некромант": {
        "GlobalIndex": 97,
        "Name": "Некромант",
        "Descript": "Некромант познал таинства смерти и законы мира духов. Своими ритуалами он подавляет жизнь вокруг себя.",
        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",
        "IconIndex": 94,
        "Bonus": "Evasive",
        "NextUnit1": "Лич",
        "NextUnit1Level": 1,
        "Hits": 90,
        "MagicPower": 50,
        "ProtectLife": 40,
        "ProtectDeath": 55,
        "ProtectElemental": 55,
        "Initiative": 20,
        "Manevres": 2,
        "Vampirizm": 20,
    },
    "Нищенка": {
        "GlobalIndex": 98,
        "Name": "Нищенка",
        "Descript": "Обыкновеная нищенка. Таких можно часто увидеть возле церкви или на рынке.",
        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",
        "IconIndex": 95,
        "NextUnit1": "Атаманша",
        "NextUnit1Level": 3,
        "NextUnit2": "Разбойница",
        "NextUnit2Level": 3,
        "NextUnit3": "Колдунья",
        "NextUnit3Level": 3,
        "Hits": 35,
        "AttackBlow": 10,
        "MagicPower": 15,
        "Initiative": 10,
        "Manevres": 1,
    },
    "Архилич": {
        "GlobalIndex": 99,
        "Name": "Архилич",
        "Descript": "Познавший все таинства жизни и смерти, мертвый некромант достигает невиданных сил и возможностей.",
        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",
        "IconIndex": 96,
        "Bonus": "Unvulnerabe",
        "Hits": 80,
        "MagicPower": 70,
        "ProtectLife": 80,
        "ProtectDeath": 90,
        "ProtectElemental": 90,
        "Initiative": 20,
        "Manevres": 3,
        "Vampirizm": 40,


    },
    "Посланник Смерти": {
        "GlobalIndex": 101,
        "Name": "Посланник Смерти",
        "Descript": "Тайный посланник смерти, подчиненный силам мертвых, служит некромантам и личам в их страшных делах.",

        "Magic": "DeathMagic",
        "MagicDirection": "ToAll",

        "IconIndex": 98,
        "Bonus": "Unvulnerabe",
        "Hits": 30,
        "MagicPower": 30,
        "ProtectLife": 80,
        "ProtectDeath": 80,
        "ProtectElemental": 80,
        "Initiative": 20,
        "Manevres": 2,
        "Vampirizm": 50,


    },
    "Чумной доктор": {
        "GlobalIndex": 102,
        "Name": "Чумной доктор",
        "Descript": "Чумной доктор - врачеватель чумы, и других болезней. Он знает как поддержать больного в трудную минуту, и принести облегчение от страданий.",

        "Magic": "LifeMagic",
        "MagicDirection": "ToAlly",
        "Surrender": 10,

        "IconIndex": 99,
        "Bonus": "ArmyMedic",
        "Hits": 75,
        "MagicPower": 25,
        "ProtectLife": 50,
        "ProtectDeath": 95,
        "ProtectElemental": 50,
        "Initiative": 15,
        "Manevres": 3,
        "Regen": 10,


    }
};