/**
 * Created by fable on 15/10/09.
 * @Author fable
 * @desc   UI有关的全局公共常量，函数，等都可以写在这里，前面带前缀ui,
 * eg:
 * fb.UI_QUALITY_WHITE = 1
 */

var fb = fb || {};

//hero info
fb.UI_QUALITY_WHITE = 1;
fb.UI_QUALITY_GREEN = 2;
fb.UI_QUALITY_BLUE = 3;
fb.UI_QUALITY_PURPLE = 4;
fb.UI_QUALITY_GOLDEN = 5;

fb.UI_SMALL_EXP_ITEM_ID = 10001;
fb.UI_MID_EXP_ITEM_ID = 10002;
fb.UI_BIG_EXP_ITEM_ID = 10003;
fb.UI_HUGE_EXP_ITEM_ID = 10004;

fb.UI_SKILL_1 = [];
fb.UI_SKILL_2 = [];
fb.UI_SKILL_1[1] = 30;
fb.UI_SKILL_1[2] = 50;
fb.UI_SKILL_1[3] = 70;
fb.UI_SKILL_1[4] = 100;
fb.UI_SKILL_1[5] = "MAX";
fb.UI_SKILL_2[1] = 30;
fb.UI_SKILL_2[2] = 50;
fb.UI_SKILL_2[3] = 100;
fb.UI_SKILL_2[4] = 150;
fb.UI_SKILL_2[5] = "MAX";

//上阵英雄排在前面，战斗力从大到小排
fb.UI_sortHeroList = function(heroList){

	cc.assert(cc.isArray(heroList), "fb.sortHeroList  heroList is not Array");

    heroList.sort(function(a, b){return (b.alive - a.alive);});
    heroList.sort(function(a, b){
        if(a.alive == b.alive){
            return (b.battle - a.battle);
        }
    });
    //heroList.sort(function(a, b){return (a.battle - b.battle); });    //小 到 大
};





