
/**
 * Created by fable on 15/08/20.
 * @Author fable
 * @desc   ...
 */



var Hurt = cc.Class.extend({

	_attack  : null,
	_attacked: null,


	ctor:function(attack, attacked, cb, ai){
		//this._super();

		this._attack   = attack;
		this._attacked = attacked;

		return true;
	},


	calcHurt:function(){

		//........................
		//r
		return Math.random()*(800-100)+100;;
	}


});
