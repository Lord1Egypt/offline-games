
var matrix_;
var bubble_collided_x = 0,bubble_collided_y = 0,cell_=0;

function start_layout (){

	matrix_ = new Array(); 
	
	for(var a =100;a>=-4;a--){
	
		matrix_[a]= new Array();
			
		
	}


}
	
	function define_cell(picked){	
		var x_ = Math.round(picked.x/32);
		var y_ = Math.round(picked.y/55);	
		
		matrix_[y_][x_] = {x:x_,y:y_};
	
	}
	

	function add_to_matrix (picked){

		var x_ = Math.round(picked.x/32);
		var y_ = Math.round(picked.y/55);
		
	
		
			matrix_[y_][x_]={
			x:x_,
			y:y_,
			picked:picked,

			}

			picked.cell = matrix_[y_][x_];




}



function match(x,y){
	x = Math.round(x / 32);
	y = Math.round(y / 55);	
	var ball = matrix_[y][x].picked;	
	var position_ = ball.runtime.objects.position_.getFirstInstance();
	
	if(ball.instVars.checked==0 && ball.instVars.to_shot==0&&ball.y>position_.y){
		ball.instVars.checked =1 ;
		if(ball.runtime.globalVars.COLOR_FOR_CHECK=="none"){		
			ball.runtime.globalVars.COLOR_FOR_CHECK=ball.animationName;			
		}
		if(ball.runtime.globalVars.COLOR_FOR_CHECK==ball.animationName){		
			ball.runtime.globalVars.MATCHES2++;
			ball.instVars.matched = 1; 
			var pos=[{a:2,b:0},{a:-2,b:0},{a:1,b:1},{a:-1,b:1},{a:1,b:-1},{a:-1,b:-1}];			
			for(var a =0;a<6;a++){
				var cell = matrix_[y+pos[a].b][x+pos[a].a];
				if(cell !=undefined){
					if(cell.picked !=undefined){
						var picked = cell.picked;						
						match(picked.x,picked.y);
					}	
				}	
			}
		}	
	}
}


function fall(x,y){
	x = Math.round(x / 32);
	y = Math.round(y / 55);	
	
	if(matrix_[y]!=undefined ){
	if(matrix_[y][x]!=undefined ){
	

		var ball = matrix_[y][x].picked;	
		if(ball.instVars.checked==0&&ball.instVars.matched!=2&&ball.instVars.in_cascade==1){
			ball.instVars.checked = 1 ; 
			ball.instVars.fall = 0 ; 
			var pos=[{a:2,b:0},{a:-2,b:0},{a:1,b:1},{a:-1,b:1},{a:1,b:-1},{a:-1,b:-1}];			
				for(var a =0;a<6;a++){

					var t =  matrix_[y+pos[a].b];
					if(t!=undefined){
						var cell = t[x+pos[a].a];
						if(cell !=undefined){
							if(cell.picked !=undefined){
								var picked = cell.picked;						
								fall(picked.x,picked.y);
								
							}	
						}
					}
				}


		}
	}}
	

}

function get_close_point_in_matrix(picked){
	var x_ = Math.round(picked.x/32);
	var y_ = Math.round(picked.y/55);
	var min_distance_cell = 0 ;
	var min_distance = 100;
	
	for(var a=-15;a<=15;a++){
						

		for(var b  = -9 ;b<=9;b++){
			var t = matrix_[y_+b];
			if(t!=undefined){
				var cell = (t[x_+a])
				if(cell != undefined){
					if(cell.picked == undefined){
						var xx_ = picked.x-cell.x*32;
						var yy_ =picked.y- cell.y*55;
						var distance = Math.sqrt((xx_*xx_)+(yy_*yy_));
						if(distance<min_distance){
							min_distance = distance;
							min_distance_cell = cell;
							//console.log(min_distance_cell);
						}
					}
				}
			}

		}
	}

	return min_distance_cell;


}






const scriptsInEvents = {

	async Game_Event7(runtime, localVars)
	{
		start_layout();
	},

	async Game_Event9(runtime, localVars)
	{
		define_cell(runtime.objects.ball_position.getFirstPickedInstance());
	},

	async Game_Event11(runtime, localVars)
	{
		//console.log(matrix_);
	},

	async Game_Event14(runtime, localVars)
	{
		add_to_matrix(runtime.objects.ball.getFirstPickedInstance());
	},

	async Game_Event34(runtime, localVars)
	{
		//console.log(localVars.y_);
		for(var a =localVars.y_;a<=localVars.y_+1;a++){
				matrix_[a]= new Array();
		}
		
	},

	async Game_Event42(runtime, localVars)
	{
		define_cell(runtime.objects.ball_position.getFirstPickedInstance());
		add_to_matrix(runtime.objects.ball.getFirstPickedInstance());
		
		
	},

	async Game_Event92(runtime, localVars)
	{
		var picked = runtime.objects.ball.getFirstPickedInstance();
		cell_ = picked.cell;
	},

	async Game_Event95(runtime, localVars)
	{
		var picked = runtime.objects.ball.getFirstPickedInstance();
		var min_distance_cell = get_close_point_in_matrix(picked);
		
		/*var min_distance = 100;
		for(var a=-15;a<=15;a++){
			for(var b  = -9 ;b<=9;b++){
				var t = matrix_[y_+b];
				if(t!=undefined){
					var cell = (t[x_+a])
					if(cell != undefined){
						if(cell.picked == undefined){
							var xx_ = picked.x-cell.x*32;
							var yy_ =picked.y- cell.y*55;
							var distance = Math.sqrt((xx_*xx_)+(yy_*yy_));
							if(distance<min_distance){
								min_distance = distance;
								min_distance_cell = cell;
							}
						}
					}
				}
				
			}
		}*/
		picked.x = min_distance_cell.x*32;
		picked.y = min_distance_cell.y*55;
		min_distance_cell.picked = picked;
		min_distance_cell.picked.cell = min_distance_cell
		picked.instVars.to_start_match = 1;
		picked.instVars.in_cascade = 1;
		picked.instVars.to_shot = 0 ; 
		picked.children
	},

	async Game_Event105(runtime, localVars)
	{
		var ball_ = runtime.objects.ball.getFirstPickedInstance();
		var cell_ = matrix_[Math.round( ball_.y/55)][Math.round(ball_.x/32)];
		cell_.picked = undefined;
		
	},

	async Game_Event117(runtime, localVars)
	{
		match(localVars.x_,localVars.y_);
	},

	async Game_Event126(runtime, localVars)
	{
		var position_ = runtime.objects.position_.getFirstInstance();
		
		
		runtime.objects.ball.getAllInstances().forEach((eee)=>{
			
			eee.instVars.checked = 0;
			eee.instVars.fall = 1 ;
			
			if(eee.instVars.to_shot == 1 || eee.instVars.to_shot == 2 || eee.instVars.next_ball ==1||
			   eee.instVars.falling == 1||eee.animationName=="pool"
			  ){
				eee.instVars.fall = 0 ; 
			}
			if(eee.y < position_.y ){
					eee.instVars.fall = 0 ; 
			}
		
		
		});
		
		
		runtime.objects.ball.getAllInstances().forEach((eee)=>{
			if(eee.y < position_.y ){
					fall(eee.x,eee.y);
			}
		
		});
		
		
		runtime.callFunction("explode",[localVars.fall_for_fireball])
	},

	async Game_Event151_Act2(runtime, localVars)
	{
		
	},

	async Game_Event159(runtime, localVars)
	{
		runtime.objects.ball.getPickedInstances().forEach((e)=>{
			e.cell.picked = undefined;
		
		
		});
	},

	async Game_Event189(runtime, localVars)
	{
		var picked = runtime.objects.ball_erase_line_helper.getFirstPickedInstance();
		var min_distance_cell = get_close_point_in_matrix(picked);
		var bomb_zone = runtime.objects.bomb_zone.getFirstPickedInstance();
		
		bomb_zone.x = min_distance_cell.x*32;
		bomb_zone.y = min_distance_cell.y*55;
		/*
		min_distance_cell.picked = picked;
		min_distance_cell.picked.cell = min_distance_cell
		picked.instVars.to_start_match = 1;
		picked.instVars.in_cascade = 1;
		picked.instVars.to_shot = 0 ; 
		picked.children*/
	},

	async E_js_events_Event5_Act2(runtime, localVars)
	{
		Android["gameLoaded"]()
	},

	async E_js_events_Event8_Act1(runtime, localVars)
	{
		Android[localVars.name_event](localVars.param);
		
	},

	async E_js_events_Event9_Act1(runtime, localVars)
	{
		console.log(localVars.name_event+" : "+localVars.param)
	},

	async E_js_events_Event10_Act1(runtime, localVars)
	{
		try {var messageBody = {type: localVars.type, value: localVars.param};window.webkit.messageHandlers.ports.postMessage(messageBody);} catch (err) {console.log(err);}
	},

	async E_js_events_Event18_Act1(runtime, localVars)
	{
		Android[localVars.name_event](localVars.param);
		
	},

	async E_js_events_Event19_Act1(runtime, localVars)
	{
		console.log(localVars.name_event+" : "+localVars.param)
	},

	async E_js_events_Event20_Act1(runtime, localVars)
	{
		try {var messageBody = {type: localVars.type, value: localVars.param};window.webkit.messageHandlers.ports.postMessage(messageBody);} catch (err) {console.log(err);}
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

