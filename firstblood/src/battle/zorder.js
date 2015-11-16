
/**
 * Created by fable on 15/08/27.
 * @Author fable
 * @desc   ...
 */

/*
    *2*118                      *2*118              
             *0*122    *0*122   
    *3*126                      *3*126           
             *1*130    *1*130    
    *4*134                      *4*134                 

 */
var fb = fb || {};

fb.ZORDER  = [122, 130, 118, 126, 134];

var ZOrder = cc.Class.extend({

	_attack_ary  : [],
	_attacked_ary : [],

	_attack_zorder: 0,
	_attacked_zorder: 0,


	ctor:function(heroAry, enemyAry){
		//this._super();

		this._attack_ary  = heroAry;
		this._attacked_ary = enemyAry;

		return true;
	},

	setZOrder:function(attack, attacked, attack_ary, attacked_ary){
		this._attack_ary  = attack_ary;
		this._attacked_ary = attacked_ary;

		switch(attack.getIndex()){
			case 0:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						this._attack_zorder = attack.getLocalZOrder();
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);
						break;
					}
					case 1:
					{
						this._attack_zorder = attack.getLocalZOrder();						
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);							
						break;
					}
					case 2:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);								
						break;
					}
					case 3:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);								
						break;
					}
					case 4:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);							
						break;
					}
					default:
						break;
				}
				break;
			}
			case 1:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						//attack.setLocalZOrder(attacked.getLocalZOrder() + 1);
						break;
					}
					case 1:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);							
						break;
					}
					case 2:
					{
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);								
						break;
					}
					case 3:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);														
						break;
					}
					case 4:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);						
						break;
					}
					default:
						break;
				}
				break;
			}
			case 2:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						this._attacked_zorder = attacked.getLocalZOrder();							
						attacked.setLocalZOrder(attacked.getLocalZOrder() - 5);
						break;
					}
					case 1:
					{
						this._attacked_zorder = attacked.getLocalZOrder();							
						attacked.setLocalZOrder(attacked.getLocalZOrder() - 13);							
						break;
					}
					case 2:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);								
						break;
					}
					case 3:
					{
						for (var i in this._attacked_ary) {
							this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() - 8);
						}

						this._attack_zorder = attack.getLocalZOrder();		
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);														
						break;
					}
					case 4:
					{
						for (var i in this._attacked_ary) {
							this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() - 16);
						}

						this._attack_zorder = attack.getLocalZOrder();	
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);						
						break;
					}
					default:
						break;
				}
				break;
			}
			case 3:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						//attacked.setLocalZOrder(attacked.getLocalZOrder() - 5);
						break;
					}
					case 1:
					{
						this._attacked_zorder = attacked.getLocalZOrder();							
						attacked.setLocalZOrder(attacked.getLocalZOrder() - 5);							
						break;
					}
					case 2:
					{
						for (var i in this._attacked_ary) {
							if(this._attacked_ary[i].getIndex() == 0)
							{
								this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() + 5);
								break;	
							}
						}						
						break;
					}
					case 3:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);														
						break;
					}
					case 4:
					{
						for (var i in this._attacked_ary) {
							if(this._attacked_ary[i].getIndex() == 1)
							{
								this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() - 5);
								break;	
							}
						}	

						this._attacked_zorder = attacked.getLocalZOrder();	
						attacked.setLocalZOrder(attacked.getLocalZOrder() - 9);			
						break;
					}
					default:
						break;
				}
				break;
			}
			case 4:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attack.getLocalZOrder() - 5);	
						break;
					}
					case 1:
					{
						//attacked.setLocalZOrder(attacked.getLocalZOrder() - 5);							
						break;
					}
					case 2:
					{
						for (var i in this._attacked_ary) {
							if(this._attacked_ary[i].getIndex() == 1)
							{
								this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() + 6);
								break;	
							}
						}	

						this._attack_zorder = attack.getLocalZOrder();	
						attack.setLocalZOrder(attack.getLocalZOrder() - 7);												
						break;
					}
					case 3:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attack.getLocalZOrder() - 7);														
						break;
					}
					case 4:
					{
						this._attack_zorder = attack.getLocalZOrder();							
						attack.setLocalZOrder(attacked.getLocalZOrder() + 1);		
						break;
					}
					default:
						break;
				}
				break;
			}

			default:
			break;
		}

	},

	resetZOrder:function(attack, attacked){

		switch(attack.getIndex()){
			case 0:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						attack.setLocalZOrder(this._attack_zorder);
						break;
					}
					case 1:
					{
						attack.setLocalZOrder(this._attack_zorder);							
						break;
					}
					case 2:
					{
						attack.setLocalZOrder(this._attack_zorder);								
						break;
					}
					case 3:
					{
						attack.setLocalZOrder(this._attack_zorder);								
						break;
					}
					case 4:
					{
						attack.setLocalZOrder(this._attack_zorder);							
						break;
					}
					default:
						break;
				}
				break;
			}
			case 1:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						//attack.setLocalZOrder(attacked.getLocalZOrder() + 1);
						break;
					}
					case 1:
					{
						attack.setLocalZOrder(this._attack_zorder);							
						break;
					}
					case 2:
					{
						attack.setLocalZOrder(this._attack_zorder);								
						break;
					}
					case 3:
					{
						attack.setLocalZOrder(this._attack_zorder);														
						break;
					}
					case 4:
					{
						attack.setLocalZOrder(this._attack_zorder);						
						break;
					}
					default:
						break;
				}
				break;
			}
			case 2:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						attacked.setLocalZOrder(this._attacked_zorder);
						break;
					}
					case 1:
					{
						attacked.setLocalZOrder(this._attacked_zorder);							
						break;
					}
					case 2:
					{
						attack.setLocalZOrder(this._attack_zorder);								
						break;
					}
					case 3:
					{
						for (var i in this._attacked_ary) {
							this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() + 8);
						}

						attack.setLocalZOrder(this._attack_zorder);														
						break;
					}
					case 4:
					{
						for (var i in this._attacked_ary) {
							this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() + 16);
						}

						attack.setLocalZOrder(this._attack_zorder);						
						break;
					}
					default:
						break;
				}
				break;
			}
			case 3:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						//attacked.setLocalZOrder(attacked.getLocalZOrder() - 5);
						break;
					}
					case 1:
					{
						attacked.setLocalZOrder(this._attacked_zorder);							
						break;
					}
					case 2:
					{
						for (var i in this._attacked_ary) {
							if(this._attacked_ary[i].getIndex() == 0)
							{
								this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() - 5);
								break;	
							}
						}						
						break;
					}
					case 3:
					{
						attack.setLocalZOrder(this._attack_zorder);														
						break;
					}
					case 4:
					{
						for (var i in this._attacked_ary) {
							if(this._attacked_ary[i].getIndex() == 1)
							{
								this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() + 5);
								break;	
							}
						}	

						attacked.setLocalZOrder(this._attacked_zorder);			
						break;
					}
					default:
						break;
				}
				break;
			}
			case 4:
			{
				switch(attacked.getIndex()){
					case 0:
					{
						attack.setLocalZOrder(this._attack_zorder);	
						break;
					}
					case 1:
					{
						//attacked.setLocalZOrder(attacked.getLocalZOrder() - 5);							
						break;
					}
					case 2:
					{
						for (var i in this._attacked_ary) {
							if(this._attacked_ary[i].getIndex() == 1)
							{
								this._attacked_ary[i].setLocalZOrder(this._attacked_ary[i].getLocalZOrder() - 6);
								break;	
							}
						}	

						attack.setLocalZOrder(this._attack_zorder);												
						break;
					}
					case 3:
					{
						attack.setLocalZOrder(this._attack_zorder);														
						break;
					}
					case 4:
					{
						attack.setLocalZOrder(this._attack_zorder);		
						break;
					}
					default:
						break;
				}
				break;
			}
			default:
			break;
		}
	},
});


