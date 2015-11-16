
/**
 * Created by Tom on 15/09/24.
 * @Author Tom
 * @desc   MVC 模式， CustomsPassScene的model,controller
 */


var ChapterMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(){

        return true;
    },

    model:function(){
    //this._model
        var starList = [];
        var simp = {};
        var elite = {};
        simp.chapterNum = SimpleMapData.getInstance().getChapterTotalNumber();
        simp.currNum = SimpleMapData.getInstance().getChapterCurrNumber();
        elite.chapterNum = EliteMapData.getInstance().getChapterTotalNumber();
        elite.currNum = EliteMapData.getInstance().getChapterCurrNumber();
        var simpleStarList = {};
        for(var i = 1;i<=simp.chapterNum;i++)
        {
            var unit = {}
            unit.currStar = SimpleMapData.getInstance().getSenctionCurrStarByChapter(i);
            unit.allStar = 3*SimpleMapData.getInstance(). getSenctionTotalNumberByChapter(i);
            simpleStarList[i] = unit;
        }
        var eliteStarList = {};
        for(var k = 1;k<=elite.chapterNum;k++)
        {
            var unit = {}
            unit.currStar = EliteMapData.getInstance().getSenctionCurrStarByChapter(k);
            unit.allStar = 3*EliteMapData.getInstance(). getSenctionTotalNumberByChapter(k);
            eliteStarList[k] = unit;
        }
        simp.starList = simpleStarList;
        elite.starList = eliteStarList;
        starList[1] = simp;
        starList[2] = elite;
        this._model.starList = starList;
    },

    view:function(cbScene){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        if(cbScene)
            cbScene();
        else
            SceneManager.getInstance().push("ChapterScene", this);        
    }
});
