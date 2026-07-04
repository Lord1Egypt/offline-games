


const scriptsInEvents = {

	async Js_event_Event5_Act1(runtime, localVars)
	{
		Android["levelStartInGame"](runtime.globalVars.Levels);
		
	},

	async Js_event_Event9_Act1(runtime, localVars)
	{
		Android["levelCompleteInGame"](runtime.globalVars.Levels);
		
	},

	async Js_event_Event13_Act1(runtime, localVars)
	{
		Android["levelLoseInGame"](runtime.globalVars.Levels);
		
	},

	async Js_event_Event17_Act1(runtime, localVars)
	{
		Android["levelRestartInGame"](runtime.globalVars.Levels);
		
	},

	async Js_event_Event21_Act1(runtime, localVars)
	{
		Android["gameLoaded"]()
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

