
/**
 * Created by fable on 15/08/20.
 * @Author fable
 * @desc   ...
 */


var res = {

    logo_jpg :  "res/ui/background/bg1.jpg",
    //data
    error_data_json  : "res/data/error.json",
    hero_data_json   : "res/data/hero.json",
    aoyi_data_json   : "res/data/aoyi.json",
    item_data_json   : "res/data/item.json",
    quality_data_json : "res/data/quality.json",
    monster_data_json : "res/data/monster.json",
    simpleMap_data_json : "res/data/simple_map.json",
    eliteMap_data_json : "res/data/elite_map.json",
    task_data_json : "res/data/task.json",
//    player_data_json : "res/data/player.json",
//    fushi_data_json  : "res/data/fushi.json",

    //text
    text_zh_data_json   : "res/data/text_zh.json",
//    text_en_data_json   : "res/data/text_en.json",


    //loading layer
    loading_layer_json : "res/ui/loadinglayer.json",

    //tipdlg layer
    tipdlg_layer_json : "res/ui/tipdlglayer.json",

    //return layer
    return_layer_json : "res/ui/returnlayer.json",

    //emaill layer
    emaill_layer_json : "res/ui/emailllayer.json",

    //consumetemplate
    consume_template_json : "res/ui/consumetemplate.json",

    //herosmalltemplate
    hero_small_template_json : "res/ui/herosmalltemplate.json",

    //login scene
    login_scene_json : "res/ui/loginscene.json",

    //main scene
    main_scene_json : "res/ui/mainscene.json",

    //tavern scene
    tavern_scene_json : "res/ui/tavernscene.json",

    //store scene
    store_scene_json : "res/ui/storescene.json",

    //tower scene
    tower_scene_json : "res/ui/towerscene.json",

    //task scene
    task_scene_json : "res/ui/taskscene.json",

    //customs  scene
    chapter_scene_json : "res/ui/chapterscene.json",

    //signin layer
    sign_in_layer_json : "res/ui/signinlayer.json",

    //customs scene
    customs_scene_json : "res/ui/customsscene.json",

    //hero manager scene
    hero_manager_scene_json : "res/ui/heromanagerscene.json",

    //hero strengthen scene
    hero_strengthen_scene_json : "res/ui/herostrengthenscene.json",

    //hero uplevel scene
    hero_upLevel_scene_json :"res/ui/herouplevelscene.json",

    //knapsack scene
    knapsack_scene_json : "res/ui/knapsackscene.json",

    //cast scene
    case_scene_json : "res/ui/castscene.json",

    //embattle scene
    embattle_scene_json : "res/ui/embattlescene.json",

    //buzhen scene
    buzhen_scene_json : "res/ui/buzhenscene.json",

    //herolist scene
    hero_list_scene_json : "res/ui/herolistscene.json",

    //heropresentation scene
    hero_presentation_scene : "res/ui/heropresentationscene.json",

    //battle show scene
    battle_show_scene_json : "res/ui/battleshowscene.json",
    battle_win_layer_json : "res/ui/battlewinlayer.json",
    battle_lose_layer_json : "res/ui/battleloselayer.json",

    //loading scene
    loading_scene : "res/ui/loadingscene.json",

    //battle
    battle_baoji_png : "res/battle/hurteffect/baoji.png",
    battle_bisha_png : "res/battle/hurteffect/bisha.png",
    battle_shanbi_png : "res/battle/hurteffect/shanbi.png",
    battle_gedang_png : "res/battle/hurteffect/gedang.png",
    battle_zhongji_png : "res/battle/hurteffect/zhongji.png",
    battle_shengjian_png : "res/battle/hurteffect/shengjian.png",
    battle_chongsheng_png : "res/battle/hurteffect/chongsheng.png",
    // battle_lose_png : "res/battle/lose.png",
    // battle_win_png : "res/battle/win.png",
    // battle_fight_png : "res/battle/fight2.png",
    //battle_replay_png : "res/battle/replay.png",
    battle_bloodgray_png : "res/battle/bloodgray.jpg",
    battle_bloodred_png : "res/battle/bloodred.jpg",
    battle_bloodyellow_png : "res/battle/bloodyellow.jpg",
    battle_fnt1_fnt :   "res/battle/myfont1.fnt",
    hero_spine_path : "res/spine/",

    //common
    common_hero_star : "res/common/herosmall/herostar.png",
    common_quality_star : "res/common/herosmall/qualitystar.png",
    common_quality_white : "res/common/herosmall/qualitywhite.png",
    common_quality_green : "res/common/herosmall/qualitygreen.png",
    common_quality_blue : "res/common/herosmall/qualityblue.png",
    common_quality_purple : "res/common/herosmall/qualitypurple.png",
    common_quality_golden : "res/common/herosmall/qualitygolden.png",

    //ui common
    common_gold : "res/ui/common/gold.png",
    common_jewel : "res/ui/common/jewel.png",


    //chapter
    chapter_customs_elite  : "res/ui/chapterscene/cs_customs_elite.png",
    chapter_customs_ordinary  : "res/ui/chapterscene/cs_customs_ordinary.png",
    chapter_rudder_elite  : "res/ui/chapterscene/cs_rudder_elite.png",
    chapter_rudder_ordinary  : "res/ui/chapterscene/cs_rudder_ordinary.png",



};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

var loader_resources = [];
for (var i in res) {
    if(i.indexOf("_path") == -1 )
    {
        loader_resources.push(res[i]);
    }
}