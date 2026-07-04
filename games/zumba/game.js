var game, hidden, visibilityChange, src, debugLog = [],
	isPageVisible = !1,
	adIsShowing = !1;

function handleVisibilityChange() {
	window.gradle_ad || (document[hidden] ? (isPageVisible = !1, game && game.pauseGame()) : (isPageVisible = !0, game && game.unpauseGame()))
}
window.gradle_onPauseRequested = function() {
		window.gradle_sound = window.game.sound.masterGain.gain.value, window.game.sound.masterGain.gain.value = 0, window.game.paused = !0, window.gradle_ad = !0
	}.bind(this), window.gradle_onResumeRequested = function() {
		window.gradle_ad = !1, window.game.paused = !1, window.game.sound.masterGain.gain.value = 1
	}, void 0 !== document.hidden ? (hidden = "hidden", visibilityChange = "visibilitychange") : void 0 !== document.msHidden ? (hidden = "msHidden", visibilityChange = "msvisibilitychange") : void 0 !== document.webkitHidden && (hidden = "webkitHidden", visibilityChange = "webkitvisibilitychange"), void 0 === document.addEventListener || void 0 === document[hidden] ? gradle.event("Browser doesn't support the Page Visibility API.") : document.addEventListener(visibilityChange, handleVisibilityChange, !1),
	function(t) {
		var e = function() {
			function t() {
				this.LEVEL_SPEED = [80, 80, 80, 70, 80, 80, 70, 80, 80, 70, 80, 80, 65, 80, 85, 60, 80, 90, 60, 80, 90, 60, 80, 80, 60, 80, 80, 55, 80, 80, 65, 80, 90, 60, 80, 80, 60, 80, 80, 60, 80, 80, 65, 80, 80, 70, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80], this.CHAIN_QUICK_FILL_IN_PERCENTAGE_VALUES = [.35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35], this.FREE_BALL_SPEED = 750, this.FREE_BALL_INSERTION_SPEED = 450, this.FREE_BALL_INSERTION_SPEED_MULTIPLIER = 6.5, this.PATH_ACCELERATION = 10, this.PATH_EXPOTENTIAL_ACCELERATION = 1.06, this.GAP_COLLAPSING_MAX_SPEED = 700, this.GAP_COLLAPSING_ACCELERATION_MULTIPLIER = 1.16, this.GAP_COLLAPSING_HIT_SLOWDOWN_FACTOR = .75, this.GAP_COLLAPSING_STARTING_SPEED = -30, this.BALL_EXPLOSION_DELAY = 0, this.ZOOMER_COOLDOWN = 400, this.ZOOMER_RECOIL = 8, this.ZOOMER_RECOIL_DURATION = 100, this.ZOOMER_MAX_SAME_COLOR_BALLS_SEQUENCE = 2, this.CHAIN_START_SPEED = 650, this.CHAIN_LOSE_SPEED = 650, this.CHAIN_LOSE_ACCELERATION_MULTIPLIER = 1, this.CHAIN_QUICK_FILL_IN_BREAKING_ABSOLUTE_DISTANCE = 150, this.SLOWDOWN_POINT_BALLS_COUNT = 15, this.SLOWDOWN_POINT_SPEED_MULTIPLIER = .5, this.SLOWDOWN_POWERUP_SPEED_MULTIPLIER = .1, this.FIREBALL_SPEED_MULTIPLIER = .9, this.REWIND_SPEED = -400, this.SLOWDOWN_POWERUP_DURATION = 3e3, this.REWIND_POWERUP_DURATION = 3e3, this.LASER_POWERUP_DURATION = 7e3, this.LASER_FREE_BALL_SPEED_MULTIPLIER = 1.75, this.LIGHTING_DELAY_BETWEEN_STRIKES = 25, this.LIGHTING_MIN_TARGETS = 3, this.LIGHTING_MAX_TARGETS = 6, this.BOMB_EXPLOSION_RADIUS = 140, this.BOMB_EXPLOSION_DELAY = 50, this.PATH_SPEED_AFTER_DESTROYING_TAIL = .1, this.FIREBALL_ANGLE = 18, this.PATH_ARROW_STEP = 20, this.PATH_ARROW_BASE_DELAY = 150, this.PATH_ARROW_DURATION = 1100, this.PATH_FINISHED_BONUS_DELAY = 65, this.PATH_FINISHED_BONUS_SCORE = 10, this.PATH_FINISHED_BONUS_STEP = 60, this.SLOWDOWN_APPEARING_CHANCE = .1, this.REWIND_APPEARING_CHANCE = .1, this.BOMB_APPEARING_CHANCE = .1, this.LIGHTING_APPEARING_CHANCE = .1, this.LASER_APPEARING_CHANCE = .1, this.FIREBALL_APPEARING_CHANCE = .1, this.CHANCE_APPEARING_MULTIPLIER = 1.05, this.POWERUP_LIFETIME = 2e4, this.POWERUP_COOLDOWN = 5e3, this.POWERUP_TIMER = 1e4, this.POWERUP_TIMER_DEVIATION = .15, this.MAX_ACTIVE_POWERUPS = 4, this.ZOOMER_PRIORITY_DISTANCE = 200, this.ZOOMER_PRIORITY_BALLS_LIMIT = 5, this.ZOOMER_PRIORITY_PROBABILITY = .7, this.COIN_CHANCE = .6, this.COIN_LIFETIME = 2e4, this.COIN_TIMER = 12e3, this.COIN_TIMER_DEVIATION = .1, this.MAX_ACTIVE_COINS = 3, this.INSTANTLY_ADD_ALL_COINS = !1, this.BALL_SCORE = 10, this.COIN_SCORE = 100, this.TIME_BONUS_POINTS_PER_SECOND_PENALTY = 5, this.PATH_GENERATOR_USE_SINGLE_COLOR = !1
			}
			return t.prototype.getBallSpeed = function() {
				return this.LEVEL_SPEED[i.CURRENT_LEVEL] ? this.LEVEL_SPEED[i.CURRENT_LEVEL] : 80
			}, t.prototype.getChainQuickFillInPercentage = function() {
				return this.CHAIN_QUICK_FILL_IN_PERCENTAGE_VALUES[i.CURRENT_LEVEL] ? this.CHAIN_QUICK_FILL_IN_PERCENTAGE_VALUES[i.CURRENT_LEVEL] : .35
			}, t
		}();
		t.GameSettings = e;
		var i = function() {
			function t() {}
			return t.FONT_FAMILY = "Germania One", t.DEFAULT_FONT_FAMILY = "px " + t.FONT_FAMILY, t.PRELOADER_ATLAS = "preloader", t.GAME_ATLAS = "game", t.UI_ATLAS = "ui", t.FX_ATLAS = "fx", t.CURRENT_LEVEL = 0, t.TOTAL_LEVELS = 100, t.LAST_UNLOCKED_LEVEL = 1, t.LEVELS_WHEEL_AMPLIFIER = 9, t.LEVELS_WHEEL_EASING_POWER = 5, t.LEVELS_WHEEL_MIN_SOUND_INTERVAL = 30, t.LEVELS_ARROW_ANGLE = .1, t.USE_NEW_PATH_GENERATOR = !1, t.DEFAULT_TENSION = .5, t.POINTS_PER_SEGMENT = 10, t.PATTERN_DRAWING_INTERVAL = 5, t.PATH_SHADOW_DELTA = -1.5, t.PATH_LIGHT_DELTA = 1.5, t.BALL_DIAMETER = 45, t.INSERT_BALL_REACTION_DELAY = 50, t.GAP_DISAPPEARING_REACTION_DELAY = 75, t.ACTIVE_BALL_POSITION = new Phaser.Point(0, -52), t.NEXT_BALL_POSITION = new Phaser.Point(0, 25.5), t.NEXT_BALL_SCALE = .47, t.CANNON_TOUCH_ZONE_DIAMETER = 70, t.PLATFORM_TOUCH_ZONE_DIAMETER = 110, t.PLATFORM_HIGHLIGHT_CHECKING_PERIOD = 15, t.PLATFORM_ROTATION_TIME = 8e3, t.PLATFORM_ROTATION_SPEED = 1.6, t.LIGHTING_STRIKE_COLLAPSE_DELAY = 400, t.EDITOR_PIXELS_PER_CLICK = 1, t.EDITOR_BALL_SCALE = .5, t.EDITOR_SHOW_BALLS = !0, t.STORAGE_NAME = "gradle_v3.8.2", t.EDITOR_STORAGE_NAME = "Zumbla_Levels", t.COMBO_TEXT_SPACING = -2, t.SCORE_TEXT_SPACING = -1, t.TRANSITION_IN_DURATION = 300, t.TRANSITION_OUT_DURATION = 250, t.WINDOW_BACKGROUND_ALPHA = .82, t.RELEASE_VERSION = !0, t.INSTANT_START_FOR_MOBILES = !0, t.MUSIC_ENABLED_BY_DEFAULT = !0, t.REALTIME_CALCULATIONS = !0, t.ENABLE_DEBUG_OUTPUT = !1, t.ENABLE_PRELOADER_OUTPUT = !1, t.UNLOCK_ALL_LEVELS = !1, t.DISPLAY_FPS = !1, t.GAME_VERSION = "v3.82", t.game = new e, t
		}();
		t.Settings = i
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t, i) {
				var n = e.call(this, t, null) || this;
				return n.targetScale = i, n
			}
			return __extends(i, e), i.prototype.setInitialPosition = function() {
				var e = this.width * this.targetScale / 2,
					n = this.height * this.targetScale / 2;
				this.x = this.x > t.CustomScaleManager.ORIGINAL_WIDTH - e ? t.CustomScaleManager.ORIGINAL_WIDTH - e - i.MARGIN : this.x < e ? e + i.MARGIN : this.x, this.y = this.y > t.CustomScaleManager.ORIGINAL_HEIGHT - n ? t.CustomScaleManager.ORIGINAL_HEIGHT - n - i.MARGIN : this.y < n ? n + i.MARGIN : this.y
			}, i.MARGIN = 5, i
		}(Phaser.Group);
		t.AutoAlignableEffect = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a, s, o, r, l, h) {
				void 0 === l && (l = 250), void 0 === h && (h = 900);
				var c = e.call(this, t.App.instance, o) || this;
				return c.effectsManager = i, c.appearingTweenDuration = l, c.disappearingTweenDuration = h, c.spriteName = n, c.position.set(a, s), c.buildContent(), c.setInitialPosition(), c.animateContent(r), c
			}
			return __extends(i, e), i.prototype.buildContent = function() {
				this.mainSprite = this.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, this.spriteName)), this.mainSprite.anchor.setTo(.5, .5)
			}, i.prototype.animateContent = function(t) {
				this.scale.set(this.targetScale), this.animationA(t)
			}, i.prototype.animationA = function(t) {
				var e = this;
				this.scale.setTo(0), this.appearingTween = this.game.add.tween(this.scale).to({
					x: this.targetScale,
					y: this.targetScale
				}, this.appearingTweenDuration, Phaser.Easing.Back.Out, !0, t), this.disappearingTween = this.game.add.tween(this).to({
					y: this.y - 80,
					alpha: 0
				}, this.disappearingTweenDuration, Phaser.Easing.Cubic.In, !0, t), this.disappearingTween.onComplete.add((function() {
					return e.destroy()
				}))
			}, i.prototype.animationB = function(t) {
				var e = this;
				this.alpha = .3, this.visible = !1, this.appearingTween = this.game.add.tween(this).to({
					alpha: .9,
					y: this.y - 80
				}, this.appearingTweenDuration, Phaser.Easing.Back.Out, !0, t), this.appearingTween.onStart.add((function() {
					e.visible = !0
				}), this), this.scale.setTo(0), this.game.add.tween(this.scale).to({
					x: this.targetScale,
					y: this.targetScale
				}, this.appearingTweenDuration, Phaser.Easing.Back.Out, !0, t), this.disappearingTween = this.game.add.tween(this).to({
					alpha: 0,
					y: this.y - 120
				}, this.disappearingTweenDuration, Phaser.Easing.Linear.None).delay(200), this.disappearingTween.onComplete.add((function() {
					return e.destroy()
				})), this.appearingTween.chain(this.disappearingTween)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.effectsManager = null, this.mainSprite = null, this.appearingTween = null, this.disappearingTween = null
			}, i
		}(t.AutoAlignableEffect);
		t.Inscription = e
	}(src || (src = {})),
	function(t) {
		var e = function(t) {
			function e(e, i, n, a) {
				return t.call(this, e, "coinBonus0000", i, n, .75, a, 250, 350) || this
			}
			return __extends(e, t), e.prototype.animateContent = function(t) {
				this.animationB(t)
			}, e
		}(t.Inscription);
		t.CoinBonus = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a, s, o, r) {
				var l = e.call(this, t.App.instance, .9 + .08 * s) || this;
				return l.effectsManager = i, l.comboMultiplier = s, l.soundIndex = Phaser.Math.clamp(0 != r ? r : s, 1, 10), l.position.set(n, a), l.buildContent(), l.setInitialPosition(), l.animateContentC(o), l
			}
			return __extends(i, e), i.prototype.buildContent = function() {
				this.comboText = this.add(this.game.make.sprite(0, -5, t.Settings.GAME_ATLAS, "combo0000")), this.comboText.anchor.setTo(.5, 1), this.comboText.scale.setTo(.7), this.multiplierText = this.add(t.BitmapTextFactory.getComboText(this.comboMultiplier)), this.multiplierText.position.set(0, 22), this.multiplierText.angle = -5, this.multiplierText.scale.setTo(1)
			}, i.prototype.animateContentC = function(e) {
				var i = this;
				this.scale.setTo(0), this.appearingTween = this.game.add.tween(this.scale).to({
					x: this.targetScale,
					y: this.targetScale
				}, 250, Phaser.Easing.Back.Out, !0, e), this.game.sound.play("combo" + this.soundIndex, Phaser.Math.clamp(.15 + .1 * this.comboMultiplier, .3, .75));
				var n = t.App.instance.add.tween(this.multiplierText).to({
						angle: 5
					}, 250, Phaser.Easing.Linear.None, !0, 0, 2),
					a = t.App.instance.add.tween(this.multiplierText.scale).to({
						x: 1.07,
						y: 1.07
					}, 250, Phaser.Easing.Linear.None, !0, 0, 2);
				n.yoyo(!0, 0), a.yoyo(!0, 0), this.disappearingTween = this.game.add.tween(this).to({
					y: this.y - 50,
					alpha: 0
				}, 800, Phaser.Easing.Linear.None, !1, 0), this.disappearingTween.onComplete.add((function() {
					return i.destroy()
				})), this.appearingTween.chain(this.disappearingTween)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.effectsManager = null, this.comboText = null, this.multiplierText = null, this.appearingTween = null, this.disappearingTween = null
			}, i
		}(t.AutoAlignableEffect);
		t.ComboEffect = e
	}(src || (src = {})),
	function(t) {
		var e = function(t) {
			function e(i, n, a, s, o) {
				var r = this,
					l = n < 1 ? 1 : n > e.GAP_BONUS_SPRITES ? e.GAP_BONUS_SPRITES : n;
				return (r = t.call(this, i, "gapBonus" + l + "0000", a, s, e.getSpriteScale(l), o) || this).gapMultiplier = n, r.game.time.events.add(o, (function() {
					return r.game.sound.play("gap_bonus", .5)
				})), r
			}
			return __extends(e, t), e.getSpriteScale = function(t) {
				var e = 1;
				switch (t) {
					case 1:
						e = .75;
						break;
					case 2:
						e = .7;
						break;
					case 3:
						e = .85;
						break;
					case 4:
						e = 1
				}
				return e
			}, e.GAP_BONUS_SPRITES = 4, e
		}(t.Inscription);
		t.GapBonus = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a, s, o, r, l) {
				var h = e.call(this, t.App.instance, l) || this;
				return h.effectsManager = i, h.color = n, h.scores = o, h.position.set(a, s), h.buildContent(), h.setInitialPosition(), h.animateContentA(r), h
			}
			return __extends(i, e), i.prototype.buildContent = function() {
				this.scoresText = this.add(t.BitmapTextFactory.getScoreText(this.scores, this.color)), this.scoresText.position.set(0, 0);
				var e = .9 * this.width / 2,
					i = .9 * this.height / 2;
				this.x = this.x > t.CustomScaleManager.ORIGINAL_WIDTH - e ? t.CustomScaleManager.ORIGINAL_WIDTH - e - 5 : this.x < e ? e + 5 : this.x, this.y = this.y > t.CustomScaleManager.ORIGINAL_HEIGHT - i + 30 ? t.CustomScaleManager.ORIGINAL_HEIGHT - i + 30 : this.y < i ? i + 5 : this.y
			}, i.prototype.animateContentA = function(e) {
				var i = this;
				this.scale.set(.01), this.game.add.tween(this.scale).to({
					x: this.targetScale,
					y: this.targetScale
				}, 300, Phaser.Easing.Back.Out, !0, e), this.appearingTween = this.game.add.tween(this).to({
					y: this.y - 40
				}, 300, Phaser.Easing.Back.Out, !0, e), this.appearingTween.onStart.add((function() {
					return t.ScoreManager.instance.addScores(i.scores)
				})), this.disappearingTween = this.game.add.tween(this).to({
					alpha: 0,
					y: this.y - 100
				}, 750, Phaser.Easing.Cubic.In, !1), this.disappearingTween.onComplete.add((function() {
					return i.destroy()
				})), this.appearingTween.chain(this.disappearingTween)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.effectsManager = null, this.scoresText = null, this.appearingTween = null, this.disappearingTween = null
			}, i
		}(t.AutoAlignableEffect);
		t.ScoresEffect = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				var i = e.call(this, t.App.instance, null) || this;
				return i.buildSprites(), i
			}
			return __extends(i, e), i.prototype.buildSprites = function() {
				this.laserRays = [];
				for (var e = 0; e < i.TOTAL_PARTS; e++) {
					var n = this.add(this.game.make.sprite(0, -e * i.LASER_PART_LENGTH, t.Settings.GAME_ATLAS, "laserRay0000"));
					n.anchor.set(.5, 1), n.animations.add("rayAnimation", Phaser.Animation.generateFrameNames("laserRay", 0, 13, "", 4).reverse()).play(60, !0), this.laserRays.push(n)
				}
			}, i.prototype.setLength = function(t) {
				var e = t > 0 ? Math.floor(t / i.LASER_PART_LENGTH) : i.TOTAL_PARTS;
				e = e < 1 ? 1 : e;
				for (var n = 0; n < this.laserRays.length; n++) this.laserRays[n].visible = n < e;
				this.scale.set(1, t > 0 ? t / (e * i.LASER_PART_LENGTH) : 1)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.laserRays = null
			}, i.TOTAL_PARTS = 12, i.LASER_PART_LENGTH = 75, i
		}(Phaser.Group);
		t.LaserEffect = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(n, a) {
				var s = e.call(this, t.App.instance, a.x, a.y, t.Settings.GAME_ATLAS, "lighting0000") || this;
				return s.anchor.set(.5, 0), s.initialBallPosition = n.position.clone(), s.targetBallPosition = a.position.clone(), s.targetBall = a, s.update(), s.blinkAnimation = s.animations.add("blinkAnimation", Phaser.Animation.generateFrameNames("lighting", 0, i.LIGHTING_FRAMES - 1, "", 4)), s.endAnimation = s.animations.add("endAnimation", Phaser.Animation.generateFrameNames("lightingEnd", 0, i.DISAPPEARING_FRAMES - 1, "", 4)), s
			}
			return __extends(i, e), i.prototype.setDelay = function(t) {
				var e = this;
				return this.visible = !1, this.game.time.events.add(t, (function() {
					e.targetBall && e.targetBall.isAlive && !e.targetBall.isUnderground ? e.startAnimations() : e.destroy()
				})), this
			}, i.prototype.startAnimations = function() {
				var e = this;
				this.game.sound.play("lighting", .5), this.visible = !0, this.blinkAnimation.play(i.FPS, !1, !1), this.blinkAnimation.onComplete.add((function() {
					e.endAnimation.play(i.FPS, !1, !1), e.endAnimation.onComplete.add((function() {
						e.destroy()
					})), e.scale.set(1, 1), e.targetBall && e.targetBall.isAlive && !e.targetBall.isUnderground && (t.ScoreManager.instance.displayScores(t.ScoreManager.instance.calculateScores(1), !0, e.targetBall.color, e.targetBall.x, e.targetBall.y), e.targetBall.explodeBall())
				}))
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.targetBall.isAlive ? (this.targetBallPosition.copyFrom(this.targetBall.position), this.scale.set(1, Phaser.Math.distance(this.targetBallPosition.x, this.targetBallPosition.y, this.initialBallPosition.x, this.initialBallPosition.y) / 130)) : Phaser.Math.distance(this.targetBallPosition.x, this.targetBallPosition.y, this.initialBallPosition.x, this.initialBallPosition.y) < 120 && this.scale.set(1, Phaser.Math.distance(this.targetBallPosition.x, this.targetBallPosition.y, this.initialBallPosition.x, this.initialBallPosition.y) / 130), this.position.copyFrom(this.targetBallPosition), this.rotation = Phaser.Math.angleBetween(this.targetBallPosition.x, this.targetBallPosition.y, this.initialBallPosition.x, this.initialBallPosition.y) - Math.PI / 2
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.blinkAnimation = null, this.endAnimation = null
			}, i.LIGHTING_FRAMES = 15, i.DISAPPEARING_FRAMES = 13, i.TOTAL_FRAMES = i.LIGHTING_FRAMES + i.DISAPPEARING_FRAMES, i.FPS = 180, i
		}(Phaser.Sprite);
		t.Lighting = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a, s) {
				var o = e.call(this, t.App.instance, i, n, t.Settings.GAME_ATLAS, "pathArrow0000") || this;
				return o.anchor.set(.5), o.rotation = a, o.animations.add("arrowAnimation", Phaser.Animation.generateFrameNames("pathArrow", 0, 20, "", 4)), o.game.time.events.add(s, (function() {
					o.animations.play("arrowAnimation", 60, !1, !0)
				})), o
			}
			return __extends(i, e), i
		}(Phaser.Sprite);
		t.PathArrow = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i) {
				var n = e.call(this, t.App.instance, null) || this;
				return n.slowdownPowerup = i, n.buildSprites(), n
			}
			return __extends(i, e), i.prototype.buildSprites = function() {
				this.topLeft = this.add(new t.FrozenScreenQuarter(20.5, 96, 0, 0, 1, 1)), this.topRight = this.add(new t.FrozenScreenQuarter(t.CustomScaleManager.ORIGINAL_WIDTH - 20, 96, 0, 0, -1, 1)), this.downLeft = this.add(new t.FrozenScreenQuarter(20.5, t.CustomScaleManager.ORIGINAL_HEIGHT - 19, 0, 0, 1, -1)), this.downRight = this.add(new t.FrozenScreenQuarter(t.CustomScaleManager.ORIGINAL_WIDTH - 20, t.CustomScaleManager.ORIGINAL_HEIGHT - 19, 0, 0, -1, -1))
			}, i.prototype.freeze = function() {
				this.topLeft.freeze(), this.topRight.freeze(), this.downLeft.freeze(), this.downRight.freeze(), this.game.sound.play("freezing", .7), this.game.tweens.removeFrom(this.slowdownPowerup), this.game.add.tween(this.slowdownPowerup).to({
					slowdownMultiplier: t.Settings.game.SLOWDOWN_POWERUP_SPEED_MULTIPLIER
				}, 1e3 * t.FrozenScreenQuarter.FREEZE_ANIMATION_FRAMES_COUNT / t.FrozenScreenQuarter.FREEZE_ANIMATION_FRAMES_FRAMERATE, Phaser.Easing.Linear.None, !0)
			}, i.prototype.onFrozen = function() {
				this.slowdownPowerup.onFrozen()
			}, i.prototype.onMelted = function() {
				this.slowdownPowerup.onMelted()
			}, i.prototype.melt = function() {
				this.topLeft.melt(), this.topRight.melt(), this.downLeft.melt(), this.downRight.melt(), this.game.sound.play("unfreezing", .7), this.game.tweens.removeFrom(this.slowdownPowerup), this.game.add.tween(this.slowdownPowerup).to({
					slowdownMultiplier: 1
				}, 1e3 * t.FrozenScreenQuarter.FREEZE_ANIMATION_FRAMES_COUNT / t.FrozenScreenQuarter.FREEZE_ANIMATION_FRAMES_FRAMERATE, Phaser.Easing.Linear.None, !0)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.slowdownPowerup = null, this.topLeft = null, this.downLeft = null, this.topRight = null, this.downRight = null
			}, i
		}(Phaser.Group);
		t.FreezeEffect = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(n, a, s, o, r, l) {
				var h = e.call(this, t.App.instance, n, a, t.Settings.GAME_ATLAS, "frozenGlass0000") || this;
				return h.anchor.set(s, o), h.scale.set(2 * r, 2 * l), h.appearingAnimation = h.animations.add("appearingAnimation", Phaser.Animation.generateFrameNames("frozenGlass", 0, i.FREEZE_ANIMATION_FRAMES_COUNT, "", 4)), h.appearingAnimation.onComplete.add((function() {
					h.parent && h.parent instanceof t.FreezeEffect && h.parent.onFrozen()
				})), h.disappearingAnimation = h.animations.add("disappearingAnimation", Phaser.Animation.generateFrameNames("frozenGlass", 0, i.FREEZE_ANIMATION_FRAMES_COUNT, "", 4).reverse()), h.disappearingAnimation.onComplete.add((function() {
					h.parent && h.parent instanceof t.FreezeEffect && h.parent.onMelted()
				})), h
			}
			return __extends(i, e), i.prototype.freeze = function() {
				this.appearingAnimation.play(i.FREEZE_ANIMATION_FRAMES_FRAMERATE, !1, !1)
			}, i.prototype.melt = function() {
				this.disappearingAnimation.play(i.FREEZE_ANIMATION_FRAMES_FRAMERATE, !1, !1)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.appearingAnimation = null, this.disappearingAnimation = null
			}, i.FREEZE_ANIMATION_FRAMES_COUNT = 29, i.FREEZE_ANIMATION_FRAMES_FRAMERATE = 30, i
		}(Phaser.Sprite);
		t.FrozenScreenQuarter = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				var a = e.call(this, t.App.instance, null) || this;
				return a.position.set(i, n), a.buildLeafs(), a
			}
			return __extends(i, e), i.prototype.buildLeafs = function() {
				this.leafLeftA = this.constructLeaf(-28, -140, -12, 1, 1), this.leafLeftB = this.constructLeaf(-28, -142, -59, 1, 1), this.leafLeftC = this.constructLeaf(-28, -145, -117, 1, 1), this.leafRightA = this.constructLeaf(28, -140, 12, 1, -1), this.leafRightB = this.constructLeaf(28, -142, 59, 1, -1), this.leafRightC = this.constructLeaf(28, -145, 117, 1, -1)
			}, i.prototype.startTweens = function() {
				this.tweenFeatherJumping(this.leafLeftA, -42, -12), this.tweenFeatherJumping(this.leafLeftB, -99, -59), this.tweenFeatherJumping(this.leafLeftC, -157, -107), this.tweenFeatherJumping(this.leafRightA, 42, 12), this.tweenFeatherJumping(this.leafRightB, 99, 59), this.tweenFeatherJumping(this.leafRightC, 157, 107)
			}, i.prototype.constructLeaf = function(e, i, n, a, s) {
				var o = this.add(this.game.make.sprite(e, i, t.Settings.UI_ATLAS, "feather0000"));
				return o.anchor.set(.5, 1), o.angle = n, o.scale.set(a), o.scale.x *= s, o
			}, i.prototype.tweenFeatherJumping = function(t, e, i) {
				this.game.tweens.removeFrom(t), t.angle = e;
				var n = this.game.add.tween(t).to({
						angle: i + (i - e) / 1.6
					}, 400, Phaser.Easing.Sinusoidal.InOut, !0, 200),
					a = this.game.add.tween(t).to({
						angle: i
					}, 200, Phaser.Easing.Linear.None, !1, 0);
				n.chain(a)
			}, i
		}(Phaser.Group);
		t.FeathersAnimation = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				var a = e.call(this, t.App.instance, null) || this;
				return a.position.set(i, n), a.buildLeafs(), a
			}
			return __extends(i, e), i.prototype.buildLeafs = function() {
				this.leafLeftA = this.constructLeaf(-35, 25, -24, 1, 1), this.leafLeftC = this.constructLeaf(-73, 4, -87, .64, 1), this.leafLeftB = this.constructLeaf(-60, 15, -48, .82, 1), this.leafRightA = this.constructLeaf(35, 25, 24, 1, -1), this.leafRightC = this.constructLeaf(73, 4, 87, .64, -1), this.leafRightB = this.constructLeaf(60, 15, 48, .82, -1)
			}, i.prototype.startTweens = function() {
				this.tweenLeafJumping(this.leafLeftA, -44, -24, 4), this.tweenLeafJumping(this.leafLeftB, -62, -48, -4), this.tweenLeafJumping(this.leafLeftC, -97, -87, 6), this.tweenLeafJumping(this.leafRightA, 44, 24, -4), this.tweenLeafJumping(this.leafRightB, 62, 48, 4), this.tweenLeafJumping(this.leafRightC, 97, 87, 6)
			}, i.prototype.constructLeaf = function(e, i, n, a, s) {
				var o = this.add(this.game.make.sprite(e, i, t.Settings.UI_ATLAS, "palmLeaf0000"));
				return o.anchor.set(.5, 1), o.angle = n, o.scale.set(a), o.scale.x *= s, o
			}, i.prototype.tweenLeafJumping = function(t, e, i, n) {
				var a = this;
				this.game.tweens.removeFrom(t), t.angle = e;
				var s = this.game.add.tween(t).to({
						angle: i + (i - e) / 2
					}, 350, Phaser.Easing.Sinusoidal.InOut, !0, 150),
					o = this.game.add.tween(t).to({
						angle: i
					}, 250, Phaser.Easing.Linear.None, !1, 0);
				s.chain(o), o.onComplete.add((function(t) {
					return a.tweenLeafShaking(t, i, n)
				}), this, 0, t)
			}, i.prototype.tweenLeafShaking = function(t, e, i) {
				this.game.tweens.removeFrom(t);
				var n = this.game.add.tween(t).to({
						angle: e + i
					}, 1200, Phaser.Easing.Linear.None, !0, 400 * Math.random()),
					a = this.game.add.tween(t).to({
						angle: e
					}, 1200, Phaser.Easing.Linear.None, !1, 0);
				n.chain(a), a.chain(n)
			}, i
		}(Phaser.Group);
		t.LeafsAnimation = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				var a = e.call(this, t.App.instance, null) || this;
				a.levelNumber = 0, a.isLocked = !1, a.levelNumber = i, a.digit = a.add(t.BitmapTextFactory.getLevelText(i > t.Settings.TOTAL_LEVELS ? i - t.Settings.TOTAL_LEVELS : i, t.BallColor.GREEN)), a.digit.scale.set(1.1), a.lock = a.add(a.game.make.group(null)), a.lock.add(a.game.make.sprite(0, 0, t.Settings.UI_ATLAS, "lockIcon0000")).anchor.set(.5);
				var s = a.lock.add(t.BitmapTextFactory.getLevelText(i, t.BallColor.RED));
				return s.scale.set(.8), s.position.set(-2, 22), a.setLocked(n), a
			}
			return __extends(i, e), i.prototype.setLocked = function(t) {
				this.isLocked = t, this.isLocked ? (this.digit.visible = !1, this.lock.visible = !0) : (this.digit.visible = !0, this.lock.visible = !1)
			}, i
		}(Phaser.Group);
		t.LevelIndicator = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				var i = e.call(this, t.App.instance, null) || this;
				return i.buildBoard(), i.buildTexts(), i.buildSounds(), i
			}
			return __extends(i, e), i.prototype.show = function(e, i) {
				gradle.event("SCREEN_LEVELRESULT"), this.callback = e, this.buttons = i;
				for (var n = 0; this.buttons && n < this.buttons.length; n++) this.buttons[n].visible = !1;
				this.countingSound.volume = .8, this.addListeners();
				var a = this.updateData();
				this.updateTexts(a), this.game.state.getCurrentState() instanceof t.Level && (this.game.state.getCurrentState().uiManager.scoresValue.text = "" + t.StatsManager.instance.calculateReward())
			}, i.prototype.hide = function() {
				this.countingSound.isPlaying && this.countingSound.stop(), this.countingSound.volume = 0, this.removeListeners()
			}, i.prototype.buildTexts = function() {
				var t, e, i, n, a, s, o, r;
				t = this.assignTripleText(0, "iconBalls0000", "x99", "99999"), this.balls = t[0], this.ballsCount = t[1], this.ballsValue = t[2], e = this.assignTripleText(1, "iconCombos0000", "x99", "99999"), this.combos = e[0], this.combosCount = e[1], this.combosValue = e[2], i = this.assignTripleText(2, "iconGaps0000", "x99", "99999"), this.gaps = i[0], this.gapsCount = i[1], this.gapsValue = i[2], n = this.assignTripleText(3, "iconTime0000", "x99", "99999"), this.time = n[0], this.timeCount = n[1], this.timeValue = n[2], a = this.assignTripleText(4, "iconBonus0000", "-", "99999"), this.bonus = a[0], this.bonusCount = a[1], this.bonusValue = a[2], s = this.assignDoubleText(6, "iconBestScore0000", "", "#87FF12"), this.levelScores = s[0], this.levelScoresValue = s[1], o = this.assignDoubleText(7, "iconScore0000", "", "#FFDB33"), this.levelBest = o[0], this.levelBestValue = o[1], r = this.assignDoubleText(8, "iconTotalScore0000", "", "#F37CE4"), this.totalScores = r[0], this.totalScoresValue = r[1]
			}, i.prototype.buildSounds = function() {
				this.countingSound = this.game.add.sound("scores_counting", .8, !0)
			}, i.prototype.buildBoard = function() {
				this.boardSprite = this.add(this.game.make.sprite(0, 0, t.Settings.UI_ATLAS, "resultsBoard0000")), this.boardSprite.anchor.set(.5), this.boardSprite.inputEnabled = !0, this.levelPlate = this.add(this.game.make.sprite(1, -151, t.Settings.UI_ATLAS, "levelPlate0000")), this.levelPlate.anchor.set(.5), this.levelIconLeft = this.add(this.game.make.sprite(3 - (t.Settings.CURRENT_LEVEL > 9 ? 20 : 15), -151, t.Settings.GAME_ATLAS, "levelIcon0000")), this.levelIconLeft.anchor.set(1, .5), this.levelIconRight = this.add(this.game.make.sprite(3 + (t.Settings.CURRENT_LEVEL > 9 ? 20 : 15), -151, t.Settings.GAME_ATLAS, "levelIcon0000")), this.levelIconRight.scale.set(-1, 1), this.levelIconRight.anchor.set(1, .5), this.levelText = this.add(t.TextUtils.getShadowText("" + t.Settings.CURRENT_LEVEL, 3, -149, 22, "#FFFFFF", "#2E2E2E", 0, 3, .5))
			}, i.prototype.addListeners = function() {
				this.boardSprite.events.onInputDown.add((function() {
					this.skipCountingAnimations()
				}), this)
			}, i.prototype.removeListeners = function() {
				this.boardSprite.events.onInputDown.removeAll()
			}, i.prototype.updateData = function() {
				if (this.dataHolder = {
						balls: 0,
						combos: 0,
						gaps: 0,
						time: 0,
						bonus: 0,
						levelScore: t.StatsManager.instance.calculateReward(),
						levelBest: t.ScoreManager.instance.getLevelScores(t.Settings.CURRENT_LEVEL),
						totalScore: t.ScoreManager.instance.getTotalScores()
					}, t.PlayerStatisticsCollector.instance.time[t.Settings.CURRENT_LEVEL] > 0 ? t.PlayerStatisticsCollector.instance.time[t.Settings.CURRENT_LEVEL] = Math.min(t.PlayerStatisticsCollector.instance.time[t.Settings.CURRENT_LEVEL], t.StatsManager.instance.time) : t.PlayerStatisticsCollector.instance.time[t.Settings.CURRENT_LEVEL] = t.StatsManager.instance.time, t.PlayerStatisticsCollector.instance.balls[t.Settings.CURRENT_LEVEL] = t.StatsManager.instance.balls, t.PlayerStatisticsCollector.instance.gaps[t.Settings.CURRENT_LEVEL] = t.StatsManager.instance.gaps, t.PlayerStatisticsCollector.instance.combos[t.Settings.CURRENT_LEVEL] = t.StatsManager.instance.combos, t.PlayerStatisticsCollector.instance.coins[t.Settings.CURRENT_LEVEL] = t.StatsManager.instance.coins, this.game.state.getCurrentState() instanceof t.Level) {
					for (var e = "[", i = 0, n = this.game.state.getCurrentState().pathManager.paths; i < n.length; i++) e += n[i].pathFinalizer.bonusPoints + " ";
					t.PlayerStatisticsCollector.instance.distanceToIdol[t.Settings.CURRENT_LEVEL] = e + "]"
				}
				this.levelText.setText("" + t.Settings.CURRENT_LEVEL), t.Settings.LAST_UNLOCKED_LEVEL = Math.max(t.Settings.LAST_UNLOCKED_LEVEL, t.Settings.CURRENT_LEVEL < t.Settings.TOTAL_LEVELS ? t.Settings.CURRENT_LEVEL + 1 : t.Settings.TOTAL_LEVELS);
				var a = t.ScoreManager.instance.updateLevelScores(t.Settings.CURRENT_LEVEL, t.StatsManager.instance.calculateReward());
				return t.LocalStorageController.instance.save(), a
			}, i.prototype.updateTexts = function(e) {
				var i = this;
				if (this.game.state.getCurrentState() instanceof t.Level) {
					this.levelIconLeft.x = 3 - (t.Settings.CURRENT_LEVEL > 9 ? 16 : 10), this.levelIconRight.x = 3 + (t.Settings.CURRENT_LEVEL > 9 ? 16 : 10), this.fadeIn(this.balls, 150, 700), this.fadeIn(this.combos, 150, 800), this.fadeIn(this.gaps, 150, 900), this.fadeIn(this.time, 150, 1e3), this.fadeIn(this.bonus, 150, 1100), this.fadeIn(this.levelScores, 150, 1200), this.fadeIn(this.levelBest, 150, 1300), this.fadeIn(this.totalScores, 150, 1400), this.fadeIn(this.ballsCount, 150, 700, "x" + t.StatsManager.instance.balls), this.fadeIn(this.combosCount, 150, 800, t.StatsManager.instance.combos > 0 ? "x" + t.StatsManager.instance.combos : "-"), this.fadeIn(this.gapsCount, 150, 900, t.StatsManager.instance.gaps > 0 ? "x" + t.StatsManager.instance.gaps : "-"), this.fadeIn(this.timeCount, 150, 1e3, t.TextUtils.convertMSToHumanTime(t.StatsManager.instance.time)), this.fadeIn(this.bonusCount, 150, 1100, t.StatsManager.instance.bonus > 0 ? "x" + t.StatsManager.instance.bonus : "-");
					var n = 1500,
						a = n;
					n = this.animateText(this.ballsValue, this.dataHolder, "balls", 0, t.StatsManager.instance.ballsScore, n), n = this.animateText(this.combosValue, this.dataHolder, "combos", 0, t.StatsManager.instance.combosScore, n), n = this.animateText(this.gapsValue, this.dataHolder, "gaps", 0, t.StatsManager.instance.gapsScore, n), n = this.animateText(this.timeValue, this.dataHolder, "time", 0, t.StatsManager.instance.timeScore, n);
					var s = n = this.animateText(this.bonusValue, this.dataHolder, "bonus", 0, t.StatsManager.instance.bonusScore, n);
					s > a && (this.soundStartEvent = this.game.time.events.add(a, (function() {
						return i.countingSound.play()
					})), this.soundEndEvent = this.game.time.events.add(s, (function() {
						return i.countingSound.stop()
					}))), this.fadeIn(this.levelScoresValue, 250, n + 300, "" + t.StatsManager.instance.calculateReward()), this.fadeIn(this.levelBestValue, 250, n + 600, "" + t.ScoreManager.instance.getLevelScores(t.Settings.CURRENT_LEVEL)), this.fadeIn(this.totalScoresValue, 250, n + 900, "" + t.ScoreManager.instance.getTotalScores(), function() {
						this.updateTextsAction()
					}.bind(this)), e && this.callback && (this.callbackEvent = this.game.time.events.add(n + 300, (function() {
						return i.invokeAndResetCallback()
					})))
				}
			}, i.prototype.skipCountingAnimations = function() {
				var e = this;
				[this.balls, this.ballsCount, this.ballsValue, this.combos, this.combosCount, this.combosValue, this.gaps, this.gapsCount, this.gapsValue, this.time, this.timeCount, this.timeValue, this.bonus, this.bonusCount, this.bonusValue, this.levelScores, this.levelScoresValue, this.levelBest, this.levelBestValue, this.totalScores, this.totalScoresValue].forEach((function(t) {
					e.game.tweens.removeFrom(t), t.alpha = 1
				})), this.game.tweens.removeFrom(this.dataHolder), this.countingSound.stop(), this.game.time.events.remove(this.soundStartEvent), this.game.time.events.remove(this.soundEndEvent), this.game.time.events.remove(this.callbackEvent), this.dataHolder.balls = t.StatsManager.instance.ballsScore, this.dataHolder.combos = t.StatsManager.instance.combosScore, this.dataHolder.gaps = t.StatsManager.instance.gapsScore, this.dataHolder.time = t.StatsManager.instance.timeScore, this.dataHolder.bonus = t.StatsManager.instance.bonusScore, this.ballsValue.setText("" + ~~this.dataHolder.balls), this.combosValue.setText("" + ~~this.dataHolder.combos), this.gapsValue.setText("" + ~~this.dataHolder.gaps), this.timeValue.setText("" + ~~this.dataHolder.time), this.bonusValue.setText("" + ~~this.dataHolder.bonus), this.updateTextsAction(), this.invokeAndResetCallback()
			}, i.prototype.updateTextsAction = function() {
				setTimeout(function() {
					Promise.all([gradle.event("EVENT_LEVELSUCCESS", {
						levelName: "" + t.Settings.CURRENT_LEVEL
					}), gradle.event("EVENT_LEVELSCORE", {
						levelName: "" + t.Settings.CURRENT_LEVEL,
						levelScore: t.StatsManager.instance.calculateReward()
					}), gradle.event("EVENT_TOTALSCORE", {
						totalScore: t.ScoreManager.instance.getTotalScores()
					})]).then(function() {
						for (var t = 0; this.buttons && t < this.buttons.length; t++) this.buttons[t].visible = !0
					}.bind(this), function() {
						for (var t = 0; this.buttons && t < this.buttons.length; t++) this.buttons[t].visible = !0
					}.bind(this))
				}.bind(this), 500)
			}, i.prototype.invokeAndResetCallback = function() {
				this.removeListeners(), this.callback && this.callback(), this.callback = null
			}, i.prototype.animateText = function(t, e, i, n, a, s) {
				var o = this;
				t.setText("" + n), t.alpha = 0, this.game.add.tween(t).to({
					alpha: 1
				}, 150, Phaser.Easing.Linear.None, !0, s);
				var r = 200 + Math.pow(a - n, .92);
				e[i] = n;
				var l = {};
				l[i] = a;
				var h = this.game.add.tween(e).to(l, r, Phaser.Easing.Linear.None, !0, s);
				return h.onUpdateCallback((function() {
					t.text = "" + ~~e[i]
				})), a > n && h.onStart.add((function() {
					return o.countingSound.play()
				})), h.onComplete.add((function() {
					t.text = "" + ~~e[i], o.countingSound.stop()
				})), s + r + (r > 200 ? 150 : 0)
			}, i.prototype.fadeIn = function(t, e, i, n, a) {
				void 0 === n && (n = null), n && t instanceof Phaser.Text && t.setText(n), t.alpha = 0, this.game.add.tween(t).to({
					alpha: 1
				}, e, Phaser.Easing.Linear.None, !0, i).onComplete.add((function() {
					a && "function" == typeof a && a()
				}), this)
			}, i.prototype.assignDoubleText = function(e, i, n, a) {
				this.add(this.game.make.sprite(-106, 28 * e - 110, t.Settings.UI_ATLAS, i)).anchor.set(0, .5);
				var s = this.add(t.TextUtils.getShadowText(n, 115, 28 * e - 110, 24, a, "#000000", 1, 2, 1));
				return [name, s]
			}, i.prototype.assignTripleText = function(e, i, n, a) {
				var s = this.add(this.game.make.sprite(-106, 28 * e - 110, t.Settings.UI_ATLAS, i));
				return s.anchor.set(0, .5), [s, this.add(t.TextUtils.getShadowText(n, 8, 28 * e - 110, 24, "#4BC9F3", "#000000", 1, 2, .5)), this.add(t.TextUtils.getShadowText(a, 115, 28 * e - 110, 24, "#8EE3FF", "#000000", 1, 2, 1))]
			}, i
		}(Phaser.Group);
		t.ResultsBoard = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				var i = e.call(this, t.App.instance, 0, 0, t.Settings.GAME_ATLAS, "transitionScreen0000") || this;
				return i.isActive = !1, i.game.stage.addChild(i), i.inputEnabled = !0, i.visible = !1, i.tweenIn = i.game.add.tween(i).to({
					alpha: 1
				}, t.Settings.TRANSITION_IN_DURATION, Phaser.Easing.Linear.None, !1), i.tweenOut = i.game.add.tween(i).to({
					alpha: 0
				}, t.Settings.TRANSITION_OUT_DURATION, Phaser.Easing.Linear.None, !1), i.tweenOut.onComplete.add(i.hide, i), i.resize(), i
			}
			return __extends(i, e), i.prototype.resize = function() {
				this.scale.set(t.CustomScaleManager.WIDTH / 12.5, t.CustomScaleManager.HEIGHT / 12.5), this.position.set(-t.CustomScaleManager.WIDTH / 4, -t.CustomScaleManager.HEIGHT / 4)
			}, i.prototype.start = function(t) {
				this.game.stage.addChild(this), this.isActive = !0, this.visible = !0, this.alpha = 0, this.tweenIn.onComplete.removeAll(), this.tweenIn.onComplete.add((function() {
					return t ? t() : null
				})), this.tweenIn.start()
			}, i.prototype.finish = function() {
				this.tweenOut.start()
			}, i.prototype.hide = function() {
				this.parent && this.parent.removeChild(this), this.tweenIn.onComplete.removeAll(), this.isActive = !1, this.visible = !1
			}, i
		}(Phaser.Sprite);
		t.TransitionScreen = e
	}(src || (src = {})),
	function(t) {
		var e = function(e, i, n, a, s, o, r) {
			this.tension = t.Settings.DEFAULT_TENSION, this.resolution = t.Settings.POINTS_PER_SEGMENT, this.paths = [], this.tunnels = [], this.platforms = [], this.balls = [], this.coinPlaces = [], this.paths = e || [], this.tunnels = i || [], this.tension = n, this.resolution = a, this.platforms = s || [], this.balls = o || [], this.coinPlaces = r || []
		};
		t.LevelObject = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {
				this.savedZambacto = null, this.buildZambacto()
			}
			return Object.defineProperty(e, "instance", {
				get: function() {
					return e._instance ? e._instance : e._instance = new e
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.buildZambacto = function() {
				this.savedZambacto = {
					levels: gradle_levels,
					settings: {
						LEVEL_SPEED: [80, 80, 80, 65, 85, 85, 65, 85, 85, 65, 85, 85, 65, 90, 90, 60, 90, 95, 65, 90, 95, 65, 90, 95, 65, 90, 95, 65, 90, 95, 60, 95, 100, 65, 95, 100, 65, 95, 100, 65, 100, 105, 70, 90, 105, 70, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
						CHAIN_QUICK_FILL_IN_PERCENTAGE_VALUES: [.35, .4, .4, .4, .5, .45, .4, .5, .5, .4, .5, .5, .4, .5, .5, .4, .5, .5, .4, .5, .5, .4, .5, .5, .4, .5, .5, .4, .5, .5, .4, .55, .55, .45, .55, .55, .45, .55, .55, .45, .55, .55, .45, .55, .55, .45, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35],
						FREE_BALL_SPEED: 750,
						FREE_BALL_INSERTION_SPEED: 450,
						FREE_BALL_INSERTION_SPEED_MULTIPLIER: 6.5,
						PATH_ACCELERATION: 10,
						PATH_EXPOTENTIAL_ACCELERATION: 1.06,
						GAP_COLLAPSING_MAX_SPEED: 700,
						GAP_COLLAPSING_ACCELERATION_MULTIPLIER: 1.16,
						GAP_COLLAPSING_HIT_SLOWDOWN_FACTOR: .75,
						GAP_COLLAPSING_STARTING_SPEED: -30,
						BALL_EXPLOSION_DELAY: 0,
						ZOOMER_COOLDOWN: 400,
						ZOOMER_RECOIL: 8,
						ZOOMER_RECOIL_DURATION: 100,
						ZOOMER_MAX_SAME_COLOR_BALLS_SEQUENCE: 2,
						CHAIN_START_SPEED: 650,
						CHAIN_LOSE_SPEED: 650,
						CHAIN_LOSE_ACCELERATION_MULTIPLIER: 1,
						CHAIN_QUICK_FILL_IN_BREAKING_ABSOLUTE_DISTANCE: 150,
						SLOWDOWN_POINT_BALLS_COUNT: 15,
						SLOWDOWN_POINT_SPEED_MULTIPLIER: .5,
						SLOWDOWN_POWERUP_SPEED_MULTIPLIER: .1,
						FIREBALL_SPEED_MULTIPLIER: .9,
						REWIND_SPEED: -400,
						SLOWDOWN_POWERUP_DURATION: 4e3,
						REWIND_POWERUP_DURATION: 3e3,
						LASER_POWERUP_DURATION: 12e3,
						LASER_FREE_BALL_SPEED_MULTIPLIER: 1.75,
						LIGHTING_DELAY_BETWEEN_STRIKES: 25,
						LIGHTING_MIN_TARGETS: 3,
						LIGHTING_MAX_TARGETS: 6,
						BOMB_EXPLOSION_RADIUS: 185,
						BOMB_EXPLOSION_DELAY: 50,
						PATH_SPEED_AFTER_DESTROYING_TAIL: .1,
						FIREBALL_ANGLE: 18,
						PATH_ARROW_STEP: 20,
						PATH_ARROW_BASE_DELAY: 150,
						PATH_ARROW_DURATION: 1100,
						PATH_FINISHED_BONUS_DELAY: 65,
						PATH_FINISHED_BONUS_SCORE: 10,
						PATH_FINISHED_BONUS_STEP: 60,
						SLOWDOWN_APPEARING_CHANCE: .1,
						REWIND_APPEARING_CHANCE: .06,
						BOMB_APPEARING_CHANCE: .1,
						LIGHTING_APPEARING_CHANCE: .06,
						LASER_APPEARING_CHANCE: .12,
						FIREBALL_APPEARING_CHANCE: .08,
						CHANCE_APPEARING_MULTIPLIER: 1.05,
						POWERUP_LIFETIME: 2e4,
						POWERUP_COOLDOWN: 1e4,
						POWERUP_TIMER: 15e3,
						POWERUP_TIMER_DEVIATION: .15,
						MAX_ACTIVE_POWERUPS: 4,
						ZOOMER_PRIORITY_DISTANCE: 200,
						ZOOMER_PRIORITY_BALLS_LIMIT: 5,
						ZOOMER_PRIORITY_PROBABILITY: .7,
						COIN_CHANCE: .7,
						COIN_LIFETIME: 2e4,
						COIN_TIMER: 25e3,
						COIN_TIMER_DEVIATION: .1,
						MAX_ACTIVE_COINS: 1,
						INSTANTLY_ADD_ALL_COINS: !1,
						BALL_SCORE: 10,
						COIN_SCORE: 400,
						TIME_BONUS_POINTS_PER_SECOND_PENALTY: 5,
						PATH_GENERATOR_USE_SINGLE_COLOR: !1,
						CHAIN_QUICK_FILL_IN_PERCENTAGE: .35,
						BALL_REVERSE_SPEED_MULTIPLIER: 6,
						GAP_COLLAPSING_ACCELERATION_FACTOR: .5,
						CHAIN_QUICK_FILL_IN_BREAKING_DISTANCE: .1,
						LIGHTING_COLLAPSE_GAPS_SPEED_MULTIPLIER: 1,
						LIGHTING_STRIKE_COLLAPSE_DELAY: 1e3,
						COMBO_SCORE: 100,
						GAP_SCORE: 1e3,
						PATH_ARROW_SPEED: 1600,
						CHAIN_START_SPEED_MULTIPLIER: 7,
						CHAIN_SLOWDOWN_FACTOR: .955,
						CHAIN_SPEEDUP_FACTOR: 1.055,
						REWIND_SPEED_MULTIPLIER: 5,
						CHAIN_LOSE_SPEED_MULTIPLIER: 8,
						BALL_SPEED: 75,
						SLOWDOWN_APPEARING_CHANCES: [.18, .18, .2, .22, .24, .18, .2, .22, .24, .26],
						REWIND_APPEARING_CHANCES: [.18, .18, .2, .22, .24, .18, .2, .22, .24, .26],
						BOMB_APPEARING_CHANCES: [.2, .2, .22, .24, .26, .2, .22, .24, .26, .28],
						LIGHTING_APPEARING_CHANCES: [.16, .16, .18, .2, .22, .16, .18, .2, .22, .24],
						LASER_APPEARING_CHANCES: [.22, .22, .24, .26, .28, .22, .24, .26, .28, .3],
						FIREBALL_APPEARING_CHANCES: [.14, .14, .16, .18, .2, .14, .16, .18, .2, .22],
						LIGHTING_POWERUP_DURATION: 3e3
					}
				}, this.levels = this.savedZambacto.levels
			}, e.prototype.getLevel = function(e) {
				return e < 1 || e > t.Settings.TOTAL_LEVELS ? null : this.levels[e]
			}, e
		}();
		t.LevelStorage = e
	}(src || (src = {})),
	function(t) {
		var e = function(t) {
			function e(e) {
				var i = t.call(this, e.game) || this;
				return i.level = e, i.createGraphics(), i
			}
			return __extends(e, t), e.prototype.createGraphics = function() {
				this.background = this.add(this.game.make.image(14, 75, "background1")), this.background.anchor.setTo(0)
			}, e.prototype.destroy = function() {
				t.prototype.destroy.call(this), this.level = null, this.background = null
			}, e
		}(Phaser.Group);
		t.BackgroundManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i) {
				var n = e.call(this, t.App.instance) || this;
				return n.path = i, n.level = n.path.pathManager.level, n.ballFactory = new t.BallFactory(n), n.contactResolver = new t.BallContactResolver(n), n.ballRenderer = n.add(new t.BallRenderer(n)), n
			}
			return __extends(i, e), i.prototype.initQueue = function(t) {
				this.balls = [], this.ballFactory.createQueue(t)
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.removeDeadBalls(), this.contactResolver.update(), this.removeDeadBalls(), this.ballFactory.update(), this.updateContacts(), this.ballRenderer.render()
			}, i.prototype.getFirstBall = function() {
				if (this.balls && this.balls.length > 0)
					for (var t = 0; t < this.balls.length; t++)
						if (this.balls[t] && this.balls[t].isAlive) return this.balls[t];
				return null
			}, i.prototype.getLastBall = function() {
				if (this.balls && this.balls.length > 0)
					for (var t = this.balls.length - 1; t > -1; t--)
						if (this.balls[t] && this.balls[t].isAlive) return this.balls[t];
				return null
			}, i.prototype.getLastMovingBall = function() {
				for (var t = this.getFirstBall(); t && t.isAlive && t.getNext() && t.getNext().isAlive && t.isTouching(t.getNext(), !1);) t = t.getNext();
				return t
			}, i.prototype.getAliveBallsCount = function() {
				return this.balls.reduce((function(t, e) {
					return e.isAlive ? t + 1 : t
				}), 0)
			}, i.prototype.hasAliveBalls = function() {
				return this.getAliveBallsCount() > 0
			}, i.prototype.getFutureBallsCount = function() {
				return this.ballFactory.ballsQueue.length
			}, i.prototype.insertBall = function(e, i, n, a, s, o) {
				var r = i.pathPoint;
				if (r != e.getStartPoint())
					if (r != e.getEndPoint()) {
						var l = i.segmentProgress / r.pathLength,
							h = l <= .5 ? e.getConcretePosition(r.chainIndex) : e.getConcretePosition(r.chainIndex + l - (1 - l)),
							c = l <= .5 ? e.getConcretePosition(r.chainIndex + 2 * l) : e.getConcretePosition(r.chainIndex + 1);
						h && c && (Phaser.Math.distance(a, s, h.x, h.y) < Phaser.Math.distance(a, s, c.x, c.y) && !this.level.powerupManager.hasActivePowerup(t.PowerupType.REWIND) ? this.ballFactory.insertBallBefore(e, i, n, a, s, o) : this.ballFactory.insertBallAfter(e, i, n, a, s, o))
					} else this.ballFactory.insertBallBefore(e, i, n, a, s, o);
				else this.ballFactory.insertBallAfter(e, i, n, a, s, o)
			}, i.prototype.getGapBonusesCount = function(t) {
				for (var e = 0, i = new Phaser.Line(t.freeBallStartPosition.x, t.freeBallStartPosition.y, t.position.x, t.position.y), n = new Phaser.Line(0, 0, 1, 1), a = [], s = 0; s < this.path.pathPoints.length - 1; s++) {
					n.setTo(this.path.pathPoints[s].x, this.path.pathPoints[s].y, this.path.pathPoints[s + 1].x, this.path.pathPoints[s + 1].y);
					var o = i.intersects(n, !0);
					if (o) {
						var r = this.path.pathPoints[s].chainIndex + Phaser.Math.distance(this.path.pathPoints[s].x, this.path.pathPoints[s].y, o.x, o.y) / (0 == this.path.pathPoints[s].pathLength ? 1 : this.path.pathPoints[s].pathLength);
						a.push(r)
					}
				}
				for (var l = a.length - 1; l > 0; l--) this.hasBallsBetween(a[l - 1], a[l]) || a.splice(l - 1, 1);
				if (1 == a.length) e += this.hasBallsBetween(0, a[0]) && this.hasBallsBetween(a[0], this.path.getTotalLength()) ? 1 : 0;
				else
					for (var h = 0; h < a.length; h++) 0 == h ? e += this.hasBallsBetween(0, a[h]) && this.hasBallsBetween(a[h], a[h + 1]) ? 1 : 0 : h == a.length - 1 ? e += this.hasBallsBetween(a[h - 1], a[h]) && this.hasBallsBetween(a[h], this.path.getTotalLength()) ? 1 : 0 : e += this.hasBallsBetween(a[h - 1], a[h]) && this.hasBallsBetween(a[h], a[h + 1]) ? 1 : 0;
				return e
			}, i.prototype.getOncomingBalls = function() {
				for (var t = [], e = 0; e < this.balls.length; e++) this.balls[e].isAlive && !this.balls[e].onTheWay && t.push(this.balls[e]);
				return t
			}, i.prototype.propagateImpulse = function(e, i) {
				for (var n = e; n && n.getPrev() && (n.isTouching(n.getPrev(), !1) || Phaser.Math.distance(n.x, n.y, e.x, e.y) <= t.Settings.game.BOMB_EXPLOSION_RADIUS);) n.backwardSpeed = -i, n = n.getPrev();
				for (var a = e; a && a.getNext() && (a.isTouching(a.getNext(), !1) || Phaser.Math.distance(a.x, a.y, e.x, e.y) <= t.Settings.game.BOMB_EXPLOSION_RADIUS);) a.backwardSpeed = i, a = a.getNext()
			}, i.prototype.getSequences = function() {
				for (var e = [], i = new t.BallSequence(this), n = this.getFirstBall(); n;) {
					i.push(n);
					var a = n.getNext();
					a && !a.onTheWay && a.getNext() && a.getNext().getAbsolutePosition() - n.getAbsolutePosition() <= 2 * t.Settings.BALL_DIAMETER ? (i.push(a), i.push(a.getNext()), n = a.getNext()) : (a && n.isTouching(a, !1) || (e.push(i), i = new t.BallSequence(this)), n = a)
				}
				return e
			}, i.prototype.dispatchAddingBallToTheChain = function(t) {
				if (t && t.isAlive) {
					var e = this.getSameColoredNeighborsChain(t);
					e.length >= 3 ? this.destroySubchain(e) : t.gapBonus = 0
				}
			}, i.prototype.dispatchGapDestroyingBetween = function(e, i) {
				var n = this;
				e && i && e.isAlive && i.isAlive && e.onTheWay && i.onTheWay && e.color == i.color && this.game.time.events.add(t.Settings.GAP_DISAPPEARING_REACTION_DELAY, (function(t) {
					n.dispatchAddingBallToTheChain(t)
				}), this, e)
			}, i.prototype.dispatchBallExploding = function(e) {
				t.StatsManager.instance.addBalls(1), 1 == this.getAliveBallsCount() && 0 == this.ballFactory.ballsQueue.length && (this.path.isCleared = !0, this.path.pathFinalizer.setStartposition(e.getRelativePosition()), this.path.pathCleared())
			}, i.prototype.removeDeadBalls = function() {
				for (var t = this.balls.length - 1; t > -1; t--) this.balls[t].isAlive || this.balls.splice(t, 1)
			}, i.prototype.getSameColoredNeighborsChain = function(t) {
				for (var e = [t], i = t.getPrev(); i && i.color == t.color && i.onTheWay && i.getNext() && i.isTouching(i.getNext(), !1);) e.unshift(i), i = i.getPrev();
				for (var n = t.getNext(); n && n.color == t.color && n.onTheWay && n.getPrev() && n.isTouching(n.getPrev(), !1);) e.push(n), n = n.getNext();
				return e
			}, i.prototype.destroySubchain = function(e) {
				var i = e[0].getPrev(),
					n = e[e.length - 1].getNext(); - 1 != e.indexOf(this.getFirstBall()) && this.path.speedManager.setChainSpeed(t.Settings.game.PATH_SPEED_AFTER_DESTROYING_TAIL, !0);
				for (var a = 0, s = t.ScoreManager.instance.calculateScores(e.length), o = 1, r = Phaser.ArrayUtils.getRandomItem(e).comboSoundIndex, l = 0, h = 0; h < e.length - 1; h++) e[h].comboMultiplier > o && e[h].comboMultiplier == e[h + 1].comboMultiplier && (o = e[h].comboMultiplier, r = e[h].comboSoundIndex, a += e[h].previousScore), e[h].gapBonus > l && (l = e[h].gapBonus);
				var c = l > 0 ? l * e.length * t.Settings.game.BALL_SCORE : 0;
				t.StatsManager.instance.addGapBonusScore(c);
				var u = a + t.ScoreManager.instance.calculateScores(e.length) * (o - 1);
				t.StatsManager.instance.addComboBonusScore(u);
				var p = e.length % 2 == 1 ? e[Math.floor(e.length / 2)].x : Phaser.Math.average(e[Math.floor(e.length / 2)].x, e[Math.floor(e.length / 2) - 1].x),
					g = e.length % 2 == 1 ? e[Math.floor(e.length / 2)].y : Phaser.Math.average(e[Math.floor(e.length / 2)].y, e[Math.floor(e.length / 2) - 1].y);
				if (t.ScoreManager.instance.displayScores(s + u + c, !0, e[0].color, p, g), l > 0) {
					var d = e.length % 2 == 1 ? e[Math.floor(e.length / 2)].x : Phaser.Math.average(e[Math.floor(e.length / 2)].x, e[Math.floor(e.length / 2) - 1].x),
						m = e.length % 2 == 1 ? e[Math.floor(e.length / 2)].y : Phaser.Math.average(e[Math.floor(e.length / 2)].y, e[Math.floor(e.length / 2) - 1].y);
					this.level.effectsManager.addGapBonus(d, m + 70, l, 350)
				}
				if (o >= 2) {
					var S = e.length % 2 == 1 ? e[Math.floor(e.length / 2)].x : Phaser.Math.average(e[Math.floor(e.length / 2)].x, e[Math.floor(e.length / 2) - 1].x),
						A = e.length % 2 == 1 ? e[Math.floor(e.length / 2)].y : Phaser.Math.average(e[Math.floor(e.length / 2)].y, e[Math.floor(e.length / 2) - 1].y);
					this.level.effectsManager.addComboEffect(S, A, o, 10, r)
				}
				for (var f = 0, E = e; f < E.length; f++) {
					var L = E[f];
					t.Settings.game.BALL_EXPLOSION_DELAY > 10 ? this.game.time.events.add(t.Settings.game.BALL_EXPLOSION_DELAY * e.indexOf(L), (function(t) {
						return t.explodeBall()
					}), 0, L) : L.explodeBall()
				}
				i && i.isAlive && n && n.isAlive && i.color == n.color && i.comboMultiplier == n.comboMultiplier && (i.previousScore = s + a, i.comboMultiplier = o + 1, n.comboMultiplier = o + 1, i.comboSoundIndex = r + 1, n.comboSoundIndex = r + 1);
				for (var v = n; v;) v.backwardSpeed = 0, v = v.getNext()
			}, i.prototype.updateContacts = function() {
				for (var t = this.balls.length - 1; t > -1; t--) this.balls[t].updateContacts()
			}, i.prototype.hasBallsBetween = function(t, e) {
				if (t <= e) {
					for (var i = 0; i < this.balls.length; i++)
						if (this.balls[i].getRelativePosition() >= t && this.balls[i].getRelativePosition() <= e) return !0
				} else
					for (i = this.balls.length - 1; i > -1; i--)
						if (this.balls[i].getRelativePosition() >= e && this.balls[i].getRelativePosition() <= t) return !0;
				return !1
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.ballsContainer = null, this.level = null, this.path = null, this.ballFactory.destroy(), this.ballFactory = null, this.contactResolver.destroy(), this.contactResolver = null, this.balls = null
			}, i
		}(Phaser.Group);
		t.BallManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game) || this;
				return i.level = t, i.pathManager = i.level.pathManager, i
			}
			return __extends(i, e), i.prototype.buildAll = function() {
				this.platforms = [], this.destroyAllBalls(), this.destroyAllPlatforms(), this.addPlatforms(t.LevelManager.instance.cachedLevel.platforms), this.platforms.length > 1 && this.game.time.events.loop(Phaser.Timer.SECOND * t.Settings.PLATFORM_HIGHLIGHT_CHECKING_PERIOD, this.updateHighlightings, this)
			}, i.prototype.handleTap = function() {
				if (this.cannon.isReady) {
					for (var t = this.level.getInputPosition(), e = 0, i = this.platforms; e < i.length; e++) {
						var n = i[e];
						if (n.handleTap(t)) return void this.cannon.jumpToPlatform(n)
					}
					this.cannon.isPointerOver(t) ? this.cannon.swapBalls() : this.cannon.shoot()
				}
			}, i.prototype.handleSwap = function() {
				this.cannon && this.cannon.isReady && this.cannon.swapBalls()
			}, i.prototype.addPlatforms = function(e) {
				for (var i = 0, n = e; i < n.length; i++) {
					var a = n[i],
						s = this.level.daemonManager.add(new t.Platform(this, a[0], a[1]));
					this.platforms.push(s), this.cannon || (this.cannon = this.add(new t.Cannon(this, s)))
				}
			}, i.prototype.removePlatform = function(t) {
				this.platforms.splice(this.platforms.indexOf(t), 1), this.platforms.length > 0 ? this.cannon && this.cannon.jumpToPlatform(this.platforms[0]) : (this.cannon.destroy(), this.cannon = null), t.destroy()
			}, i.prototype.getFirstColor = function() {
				var e = Phaser.ArrayUtils.getRandomItem(this.level.pathManager.paths);
				if (e) {
					if (e.ballManager.balls.length > 0) return Phaser.ArrayUtils.getRandomItem(e.ballManager.balls).color;
					if (e.ballManager.ballFactory.ballsQueue.length > 0) return e.ballManager.ballFactory.ballsQueue[e.ballManager.ballFactory.ballsQueue.length - 1].color
				}
				return t.BallFactory.getRandomColor()
			}, i.prototype.getNextColor = function(e) {
				var i = this.level.pathManager.getCriticalColors();
				if (i && i.length > 0) return Phaser.ArrayUtils.getRandomItem(i);
				var n = this.level.pathManager.getOnScreenColorsArray(e);
				if (n.length > 0) return Phaser.ArrayUtils.getRandomItem(n);
				var a = this.level.pathManager.getFutureColorsArray(e);
				if (a.length > 0) return Phaser.ArrayUtils.getRandomItem(a);
				if (e) {
					var s = this.level.pathManager.getOnScreenColorsArray(null).concat(this.level.pathManager.getFutureColorsArray(null));
					if (s.length > 0) return Phaser.ArrayUtils.getRandomItem(s)
				}
				return t.BallFactory.getRandomColor()
			}, i.prototype.update = function() {
				this.level.gameStateManager.isPaused || (e.prototype.update.call(this), this.removeDeadBalls(), this.resolveContacts(), !this.game.device.desktop && this.cannon.isPointerOver(this.level.getInputPosition()) || this.cannon.rotateToPointer(this.level.getInputPosition()))
			}, i.prototype.updateHighlightings = function() {
				for (var t = null, e = Number.MAX_VALUE, i = function(i) {
						for (var a = 0, s = 0, o = 0, r = n.level.pathManager.paths; o < r.length; o++) {
							var l = r[o];
							a += l.ballManager.balls.reduce((function(t, e) {
								return t + Phaser.Math.distance(e.x, e.y, i.x, i.y)
							}), 0), s += l.ballManager.balls.length
						}
						if (0 == s) return {
							value: void 0
						};
						(a /= s) < e && (e = a, t = i)
					}, n = this, a = 0, s = this.platforms; a < s.length; a++) {
					var o = i(s[a]);
					if ("object" == typeof o) return o.value
				}
				t && t != this.cannon.platform && t.highlight()
			}, i.prototype.removeDeadBalls = function() {
				if (this.balls)
					for (var t = this.balls.length - 1; t > -1; t--) this.balls[t].isAlive || this.balls.splice(t, 1)
			}, i.prototype.destroyAllBalls = function() {
				if (this.balls)
					for (var t = 0, e = this.balls; t < e.length; t++) e[t].destroy();
				this.balls = []
			}, i.prototype.destroyAllPlatforms = function() {
				if (this.platforms)
					for (var t = this.platforms.length - 1; t > -1; t--) this.removePlatform(this.platforms[t]);
				this.platforms = []
			}, i.prototype.resolveContacts = function() {
				if (this.balls)
					for (var t = this.balls.length - 1; t > -1; t--) this.findCoinContact(this.balls[t]), this.balls[t].isAlive && this.findChainContact(this.balls[t])
			}, i.prototype.findCoinContact = function(t) {
				for (var e = 0, i = this.level.coinManager.coins; e < i.length; e++) {
					var n = i[e];
					n && n.isAlive && n.isTouching(t) && (n.pickupCoin(), t.killBall())
				}
			}, i.prototype.findChainContact = function(e) {
				for (var i, n = null, a = Number.MAX_VALUE, s = Phaser.Math.distance(e.x, e.y, e.previousPosition.x, e.previousPosition.y), o = 0, r = this.pathManager.paths; o < r.length; o++)
					for (var l = 0, h = r[o].ballManager.balls; l < h.length; l++) {
						var c = h[l];
						if (c.isAlive && !c.isUnderground && Phaser.Math.distance((e.x + e.previousPosition.x) / 2, (e.y + e.previousPosition.y) / 2, c.x, c.y) <= s / 2 + t.Settings.BALL_DIAMETER && t.AdvancedMath.CollisionDetector.distanceToSegment(c.position, e.previousPosition, e.position) <= t.Settings.BALL_DIAMETER) {
							var u = t.AdvancedMath.CollisionDetector.getCollisionPoint(c.x, c.y, e.previousPosition.x, e.previousPosition.y, e.x, e.y),
								p = Phaser.Math.distance(u.x, u.y, e.previousPosition.x, e.previousPosition.y);
							p < a && (e instanceof t.FireBall && c.getRelativePosition() < 1 || (n = c, a = p, i = u))
						}
					}
				n && (e.position.copyFrom(i), this.handleBallContact(e, n))
			}, i.prototype.handleBallContact = function(e, i) {
				return e instanceof t.FireBall ? (t.ScoreManager.instance.displayScores(t.ScoreManager.instance.calculateScores(1), !0, i.color, i.x, i.y, Phaser.Math.random(5, 150), !0, !0), i.explodeBall(), !0) : (i.ballManager.insertBall(i.path, i, e.color, e.x, e.y, e.startPosition.clone()), e.killBall(), !1)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null, this.pathManager = null
			}, i
		}(Phaser.Group);
		t.CannonManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i) {
				var n = e.call(this, i.game) || this;
				return n.countdown = t.Settings.game.COIN_TIMER, n.level = i, n.coins = [], n.coinPlaces = [], n
			}
			return __extends(i, e), i.prototype.buildCoins = function() {
				t.LevelManager.instance.cachedLevel.coinPlaces || (t.LevelManager.instance.cachedLevel.coinPlaces = []);
				for (var e = 0, i = t.LevelManager.instance.cachedLevel.coinPlaces; e < i.length; e++) {
					var n = i[e],
						a = new t.CoinPlace(n[0], n[1]);
					this.coinPlaces.push(a)
				}
				if (t.Settings.game.INSTANTLY_ADD_ALL_COINS)
					for (var s = 0, o = this.coinPlaces; s < o.length; s++) {
						a = o[s];
						var r = this.add(new t.Coin(this, a));
						this.coins.push(r)
					}
			}, i.prototype.hideAllCoins = function() {
				this.coins.forEach((function(t) {
					return t.destroy()
				}))
			}, i.prototype.update = function() {
				this.level.gameStateManager.isPaused || (e.prototype.update.call(this), 0 != this.coinPlaces.length && (this.removeDeadCoins(), this.countdown -= this.game.time.elapsedMS, this.countdown < 0 && (this.addRandomCoin(), this.countdown = t.Settings.game.COIN_TIMER * (1 + this.game.rnd.realInRange(-t.Settings.game.COIN_TIMER_DEVIATION, t.Settings.game.COIN_TIMER_DEVIATION)))))
			}, i.prototype.addRandomCoin = function() {
				var e = this.getCoinsCount();
				if (!(e >= t.Settings.game.MAX_ACTIVE_COINS || e > this.level.pathManager.getBallsCount() / 3 || Math.random() > t.Settings.game.COIN_CHANCE || 0 == this.getFreeCoinPlacesCount())) {
					var i = this.getRandomEmptyCoinPlace(),
						n = this.add(new t.Coin(this, i));
					this.coins.push(n)
				}
			}, i.prototype.removeDeadCoins = function() {
				if (this.coins)
					for (var t = this.coins.length - 1; t > -1; t--) this.coins[t].isAlive || this.coins.splice(t, 1)
			}, i.prototype.getCoinsCount = function() {
				return this.coins.length
			}, i.prototype.getFreeCoinPlacesCount = function() {
				return this.coinPlaces.reduce((function(t, e) {
					return e.coin ? t : t + 1
				}), 0)
			}, i.prototype.getRandomEmptyCoinPlace = function() {
				return Phaser.ArrayUtils.getRandomItem(this.coinPlaces.filter((function(t) {
					return null == t.coin
				})))
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null, this.coins = null, this.coinPlaces = null
			}, i
		}(Phaser.Group);
		t.CoinManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game) || this;
				return i.level = t, i
			}
			return __extends(i, e), i.prototype.buildDaaemons = function() {
				this.daemons = [];
				for (var e = 0, i = this.level.pathManager.paths; e < i.length; e++) {
					var n = i[e],
						a = n.pathPoints[n.pathPoints.length - 2],
						s = n.pathPoints[n.pathPoints.length - 3],
						o = Phaser.Math.angleBetween(s.x, s.y, a.x, a.y) + Math.PI / 2,
						r = this.add(new t.Daemon(this, n, a.x, a.y, o));
					this.daemons.push(r), n.daemon = r
				}
			}, i.prototype.update = function() {
				this.level.gameStateManager.isPaused || e.prototype.update.call(this)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null, this.daemons = null
			}, i
		}(Phaser.Group);
		t.DaemonManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game, null) || this;
				return i.level = t, i.layerA = i.add(i.game.make.group(null)), i.layerB = i.add(i.game.make.group(null)), i.layerC = i.add(i.game.make.group(null)), i
			}
			return __extends(i, e), i.prototype.update = function() {
				this.level.gameStateManager.isPaused || e.prototype.update.call(this)
			}, i.prototype.addBallExplosion = function(e, i, n, a) {
				if (i in t.BallColor) {
					var s = e.add(this.game.make.sprite(n, a, t.Settings.GAME_ATLAS));
					return s.anchor.set(.5), s.animations.add("ballExplosion" + i, Phaser.Animation.generateFrameNames("ballExplosion" + i, 0, 13, "", 4), 30, !1), s.animations.play("ballExplosion" + i, 60, !1, !0), s
				}
				gradle.event("EffectsManager::addBallExplosion - wrong color " + i)
			}, i.prototype.addCoinExplosion = function(t, e) {
				this.addCoinsEffect(t, e), this.level.effectsManager.addCoinBonus(t, e - 10, 0)
			}, i.prototype.addBombExplosion = function(e, i) {
				var n = this.layerA.add(this.game.make.sprite(e, i, t.Settings.GAME_ATLAS));
				n.anchor.set(.5), n.animations.add("bombExplosion", Phaser.Animation.generateFrameNames("bombExplosion", 0, 17, "", 4)), n.animations.play("bombExplosion", 90, !1, !0)
			}, i.prototype.addComboEffect = function(e, i, n, a, s) {
				void 0 === s && (s = 0);
				for (var o = this.layerC.children.length - 1; o > -1; o--) this.layerC.getChildAt(o) instanceof t.ComboEffect && this.layerC.removeChildAt(o);
				t.StatsManager.instance.addCombos(1), this.layerC.add(new t.ComboEffect(this, Phaser.Math.random(e - 50, e + 50), Phaser.Math.random(i + 30, i + 110), n, a, s)), this.level.powerupManager.dispatchComboAppearing(n)
			}, i.prototype.addScoresEffect = function(e, i, n, a, s, o, r) {
				var l = this;
				this.layerB.add(new t.ScoresEffect(this, a, e, i, n, s, o)), r && this.game.time.events.add(s, (function() {
					return l.game.sound.play("pop", 1)
				}))
			}, i.prototype.addCoinBonus = function(e, i, n) {
				this.layerC.add(new t.CoinBonus(this, e, i, n)), this.game.sound.play("coin_bonus", .8)
			}, i.prototype.addCoinsEffect = function(e, i) {
				var n = this.layerC.add(this.game.make.emitter(e, i - 35, 30));
				n.makeParticles(t.Settings.GAME_ATLAS, Phaser.Animation.generateFrameNames("coin", 0, 12, "", 4)), n.gravity.setTo(0, 2e3), n.width = 120, n.setXSpeed(-50, 50), n.setYSpeed(-400, -200), n.autoAlpha = !0, n.setAlpha(1, 0, 500, Phaser.Easing.Sinusoidal.In), n.setScale(.35, .2, .35, .2, 500), n.start(!0, 400, null, t.App.instance.rnd.integerInRange(10, 15)), this.game.time.events.add(500, (function(t) {
					t.destroy(!0)
				}), this, n)
			}, i.prototype.addGapBonus = function(e, i, n, a) {
				t.StatsManager.instance.addGaps(n), this.layerC.add(new t.GapBonus(this, n, e, i, a)), this.level.powerupManager.dispatchGapBonusAppearing(n)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null
			}, i
		}(Phaser.Group);
		t.EffectsManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game) || this;
				return i.level = t, i.createGraphics(), i
			}
			return __extends(i, e), i.prototype.update = function() {
				e.prototype.update.call(this), t.Settings.ENABLE_DEBUG_OUTPUT && this.game.debug.text("" + this.game.time.fps || "--", 20, 14, "#70f0ff")
			}, i.prototype.createGraphics = function() {
				this.frameImage = this.add(this.game.make.image(-43, -73, "frame")), this.frameImage.anchor.setTo(0)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null, this.frameImage = null
			}, i
		}(Phaser.Group);
		t.ForegroundManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game) || this;
				return i._isPaused = !1, i.isStarted = !1, i.isFinished = !1, i.isLost = !1, i.hasLosingPaths = !1, i.level = t, i.isPaused = !1, i
			}
			return __extends(i, e), i.prototype.startInitialization = function() {
				this.level.pathManager.start()
			}, i.prototype.startBalls = function() {
				this.isStarted || (this.level.pathManager.paths.forEach((function(t) {
					return t.start()
				})), this.level.cannonManager.cannon.start(), this.isStarted = !0)
			}, i.prototype.finishLevel = function() {
				this.isFinished || (this.isFinished = !0, this._isPaused = !0, t.ScoreManager.instance.currentScore = t.StatsManager.instance.calculateReward(), this.level.uiManager.scoresValue.text = "" + t.StatsManager.instance.calculateReward(), this.level.pathManager && this.level.pathManager.pauseAll(), t.WindowManager.instance.showResults())
			}, i.prototype.loseLevel = function() {
				this.isLost || (this.isLost = !0, this._isPaused = !0, this.level.pathManager && this.level.pathManager.pauseAll(), this.level.cannonManager.cannon.destroyBalls(), this.level.coinManager.hideAllCoins(), t.WindowManager.instance.showDefeat())
			}, i.prototype.pauseLevel = function() {
				this.isPaused = !0, t.WindowManager.instance.showPause()
			}, i.prototype.resumeLevel = function() {
				this.isPaused = !1
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.updateGameState()
			}, i.prototype.updateGameState = function() {
				this.isPaused || this.isFinished || this.isLost || (this.hasLosingPaths = this.level.pathManager.paths.reduce((function(t, e) {
					return t || e.hasEatenBalls
				}), !1), this.level.pathManager.paths.reduce((function(t, e) {
					return t && e.isLost
				}), !0) && !this.isLost && this.loseLevel(), this.level.pathManager.paths.reduce((function(t, e) {
					return t && e.isFinished
				}), !0) && !this.isFinished && this.finishLevel())
			}, Object.defineProperty(i.prototype, "isPaused", {
				get: function() {
					return this._isPaused
				},
				set: function(t) {
					t ? (this._isPaused = !0, this.game.time.events.pause(), this.game.tweens.pauseAll(), this.level.pathManager && this.level.pathManager.pauseAll()) : (this._isPaused = !1, this.game.time.events.resume(), this.game.tweens.resumeAll(), this.level.pathManager && this.level.pathManager.resumeAll())
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null
			}, i
		}(Phaser.Group);
		t.GameStateManager = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {
				this.cachedLevel = new t.LevelObject([], [], t.Settings.DEFAULT_TENSION, t.Settings.POINTS_PER_SEGMENT, [], [], [])
			}
			return Object.defineProperty(e, "instance", {
				get: function() {
					return e._instance ? e._instance : e._instance = new e
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.loadLevel = function(e) {
				t.Settings.CURRENT_LEVEL = e, this.cachedLevel = t.LevelStorage.instance.getLevel(e)
			}, e
		}();
		t.LevelManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game) || this;
				return i.level = t, i
			}
			return __extends(i, e), i.prototype.buildPaths = function() {
				this.paths = [];
				for (var e = 0; e < t.LevelManager.instance.cachedLevel.paths.length; e++) {
					var i = this.add(new t.Path(this));
					this.paths.push(i), i.construct(t.LevelManager.instance.cachedLevel.paths[e], t.LevelManager.instance.cachedLevel.tension, t.LevelManager.instance.cachedLevel.resolution, t.LevelManager.instance.cachedLevel.balls[e])
				}
			}, i.prototype.update = function() {
				this.level.gameStateManager.isPaused || e.prototype.update.call(this)
			}, i.prototype.start = function() {
				0 != this.paths.length && this.paths[0].pathInitializer.start()
			}, i.prototype.pathCleared = function(t) {
				0 == this.paths.reduce((function(t, e) {
					return e.isCleared ? t : t + 1
				}), 0) && t.pathFinalizer.start()
			}, i.prototype.pauseAll = function() {
				for (var t = 0, e = this.paths; t < e.length; t++) e[t].speedManager.pause()
			}, i.prototype.resumeAll = function() {
				for (var t = 0, e = this.paths; t < e.length; t++) e[t].speedManager.resume()
			}, i.prototype.dispatchPathLose = function(t) {
				this.paths.forEach((function(t) {
					return t.ballEaten()
				}))
			}, i.prototype.initializeNext = function(t) {
				var e = this.paths.indexOf(t); - 1 != e && (e != this.paths.length - 1 ? this.paths[e + 1].pathInitializer.start() : this.initializationCompleted())
			}, i.prototype.finalizeNext = function(t) {
				for (var e = 0, i = this.paths; e < i.length; e++) {
					var n = i[e];
					n == t || n.isFinished || n.pathFinalizer.start()
				}
			}, i.prototype.getOnScreenColorsArray = function(t) {
				for (var e = [], i = 0, n = this.paths; i < n.length; i++)
					for (var a = 0, s = n[i].ballManager.balls; a < s.length; a++) {
						var o = s[a];
						!o.isAlive || t && o.color == t || e.push(o.color)
					}
				return e
			}, i.prototype.getAvailableColorsArray = function() {
				for (var t = [], e = 0, i = this.paths; e < i.length; e++) {
					for (var n = i[e], a = 0, s = n.ballManager.balls; a < s.length; a++) {
						var o = s[a];
						o.isAlive && t.push(o.color)
					}
					for (var r = 0, l = n.ballManager.ballFactory.ballsQueue; r < l.length; r++) {
						var h = l[r];
						t.push(h.color)
					}
				}
				return t
			}, i.prototype.getCriticalColors = function() {
				var e = [];
				if (this.paths.length < 2) return null;
				for (var i = null, n = 0, a = this.paths; n < a.length; n++) {
					var s = a[n];
					s.ballManager.balls.length <= t.Settings.game.ZOOMER_PRIORITY_BALLS_LIMIT && s.ballManager.getAliveBallsCount() > 0 && s.ballManager.getLastBall().getAbsolutePosition() > s.totalLength - t.Settings.game.ZOOMER_PRIORITY_DISTANCE && (!i || s.ballManager.balls.length < i.ballManager.balls.length) && (i = s)
				}
				if (i && Math.random() < t.Settings.game.ZOOMER_PRIORITY_PROBABILITY)
					for (var o = 0, r = i.ballManager.balls; o < r.length; o++) {
						var l = r[o];
						l.isAlive && e.push(l.color)
					}
				return e
			}, i.prototype.getRandomVisibleBall = function() {
				for (var t = [], e = 0, i = this.paths; e < i.length; e++)
					for (var n = 0, a = i[e].ballManager.balls; n < a.length; n++) {
						var s = a[n];
						s.isAlive && s.visible && t.push(s)
					}
				return t.length > 0 ? Phaser.ArrayUtils.getRandomItem(t) : null
			}, i.prototype.getRandomBallWithoutPowerup = function() {
				for (var t = [], e = 0, i = this.paths; e < i.length; e++)
					for (var n = 0, a = i[e].ballManager.balls; n < a.length; n++) {
						var s = a[n];
						s.isAlive && s.visible && !s.powerupActivator && t.push(s)
					}
				return t.length > 0 ? Phaser.ArrayUtils.getRandomItem(t) : null
			}, i.prototype.getPowerupsCount = function() {
				for (var t = 0, e = 0, i = this.paths; e < i.length; e++)
					for (var n = 0, a = i[e].ballManager.balls; n < a.length; n++) {
						var s = a[n];
						s.isAlive && s.powerupActivator && (t += 1)
					}
				return t
			}, i.prototype.getBallsCount = function() {
				for (var t = 0, e = 0, i = this.paths; e < i.length; e++)
					for (var n = 0, a = i[e].ballManager.balls; n < a.length; n++) a[n].isAlive && (t += 1);
				return t
			}, i.prototype.getInitialBallsCount = function() {
				for (var t = 0, e = 0, i = this.paths; e < i.length; e++) t += i[e].ballManager.ballFactory.totalBalls;
				return t
			}, i.prototype.getFutureColorsArray = function(t) {
				for (var e = [], i = 0, n = this.paths; i < n.length; i++)
					for (var a = 0, s = n[i].ballManager.ballFactory.ballsQueue; a < s.length; a++) {
						var o = s[a];
						t && o.color == t || e.push(o.color)
					}
				return e
			}, i.prototype.getGapBonusesCount = function(t) {
				for (var e = 0, i = 0, n = this.paths; i < n.length; i++) e += n[i].ballManager.getGapBonusesCount(t);
				return e
			}, i.prototype.initializationCompleted = function() {
				this.level.gameStateManager.startBalls()
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null, this.paths = null
			}, i
		}(Phaser.Group);
		t.PathManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i) {
				var n = e.call(this, i.game, null) || this;
				return n.countdown = t.Settings.game.POWERUP_TIMER, n.cooldown = t.Settings.game.POWERUP_COOLDOWN, n.level = i, n.powerUps = [], n.chances = [t.Settings.game.SLOWDOWN_APPEARING_CHANCE, t.Settings.game.REWIND_APPEARING_CHANCE, t.Settings.game.BOMB_APPEARING_CHANCE, t.Settings.game.LIGHTING_APPEARING_CHANCE, t.Settings.game.LASER_APPEARING_CHANCE, t.Settings.game.FIREBALL_APPEARING_CHANCE], n
			}
			return __extends(i, e), i.prototype.activatePowerup = function(e, i) {
				if (this.hasAlivePowerups(e)) this.getAlivePowerup(e).refresh(i);
				else {
					var n = null;
					switch (e) {
						case t.PowerupType.SLOWDOWN:
							n = new t.SlowdownPowerup(this, i);
							break;
						case t.PowerupType.REWIND:
							n = new t.RewindPowerup(this, i);
							break;
						case t.PowerupType.BOMB:
							n = new t.BombPowerup(this, i);
							break;
						case t.PowerupType.LIGHTING:
							i.visible && (n = new t.LightingPowerup(this, i));
							break;
						case t.PowerupType.LASER:
							n = new t.LaserPowerup(this, i);
							break;
						case t.PowerupType.FIREBALL:
							n = new t.FireballPowerup(this, i)
					}
					n && (this.add(n), this.powerUps.push(n))
				}
			}, i.prototype.hasAlivePowerups = function(t) {
				for (var e = 0, i = this.powerUps; e < i.length; e++) {
					var n = i[e];
					if (n.powerupType == t && n.isContinuous) return !0
				}
				return !1
			}, i.prototype.getAlivePowerup = function(t) {
				for (var e = 0, i = this.powerUps; e < i.length; e++) {
					var n = i[e];
					if (n.powerupType == t && n.isContinuous) return n
				}
				return null
			}, i.prototype.hasActivePowerup = function(t) {
				for (var e = 0, i = this.powerUps; e < i.length; e++) {
					var n = i[e];
					if (n.powerupType == t && n.isContinuous && n.isActive) return !0
				}
				return !1
			}, i.prototype.update = function() {
				if (!this.level.gameStateManager.isPaused && (e.prototype.update.call(this), !this.level.gameStateManager.hasLosingPaths)) {
					this.cooldown -= this.game.time.elapsedMS, this.countdown -= this.game.time.elapsedMS, this.countdown < 0 && this.cooldown < 0 && (this.activateRandomPowerup(), this.countdown = t.Settings.game.POWERUP_TIMER * (1 + this.game.rnd.realInRange(-t.Settings.game.POWERUP_TIMER_DEVIATION, t.Settings.game.POWERUP_TIMER_DEVIATION)));
					for (var i = 0; i < this.chances.length; i++) t.Settings.ENABLE_DEBUG_OUTPUT && this.game.debug.text("" + Phaser.Math.roundTo(this.chances[i], -2), 200 + 50 * i, 12, "#ffc7d2")
				}
			}, i.prototype.testRandomPowerup = function(e) {
				var i = this.level.pathManager.getPowerupsCount();
				if (!(i >= t.Settings.game.MAX_ACTIVE_POWERUPS || i > this.level.pathManager.getBallsCount() / 3)) {
					var n = this.level.pathManager.getRandomBallWithoutPowerup();
					n && (n.createPowerup(e), this.clearChances(e, !0), this.cooldown = t.Settings.game.POWERUP_COOLDOWN, this.increaseChancesExcept(e))
				}
			}, i.prototype.dispatchComboAppearing = function(t) {
				this.cooldown < 0 && t > 1 && this.activateRandomPowerup()
			}, i.prototype.dispatchGapBonusAppearing = function(t) {
				this.cooldown < 0 && t > 0 && this.activateRandomPowerup()
			}, i.prototype.activateRandomPowerup = function() {
				var e = this.level.pathManager.getPowerupsCount();
				if (!(e >= t.Settings.game.MAX_ACTIVE_POWERUPS || e > this.level.pathManager.getBallsCount() / 3)) {
					var i = this.level.pathManager.getRandomBallWithoutPowerup();
					if (i) {
						var n = this.selectRandomPowerup();
						null != n && (i.createPowerup(n), this.clearChances(n, !0), this.cooldown = t.Settings.game.POWERUP_COOLDOWN, this.increaseChancesExcept(n))
					}
				}
			}, i.prototype.selectRandomPowerup = function() {
				for (var e = [t.PowerupType.LASER, t.PowerupType.LIGHTING, t.PowerupType.REWIND, t.PowerupType.SLOWDOWN, t.PowerupType.BOMB, t.PowerupType.FIREBALL], i = e.length - 1; i > -1; i--) Math.random() > this.getChance(e[i]) && e.splice(i, 1);
				return e.length > 0 ? Phaser.ArrayUtils.getRandomItem(e) : null
			}, i.prototype.getChance = function(t) {
				return this.chances[t]
			}, i.prototype.clearChances = function(e, i) {
				switch (void 0 === i && (i = !1), e) {
					case t.PowerupType.SLOWDOWN:
						this.chances[e] = i ? 0 : this.chances[e] < 0 ? ~~(this.chances[e] + 1) : t.Settings.game.SLOWDOWN_APPEARING_CHANCE;
						break;
					case t.PowerupType.REWIND:
						this.chances[e] = i ? -2 : this.chances[e] < 0 ? ~~(this.chances[e] + 1) : t.Settings.game.REWIND_APPEARING_CHANCE;
						break;
					case t.PowerupType.BOMB:
						this.chances[e] = i ? 0 : this.chances[e] < 0 ? ~~(this.chances[e] + 1) : t.Settings.game.BOMB_APPEARING_CHANCE;
						break;
					case t.PowerupType.LIGHTING:
						this.chances[e] = i ? 0 : this.chances[e] < 0 ? ~~(this.chances[e] + 1) : t.Settings.game.LIGHTING_APPEARING_CHANCE;
						break;
					case t.PowerupType.LASER:
						this.chances[e] = i ? 0 : this.chances[e] < 0 ? ~~(this.chances[e] + 1) : t.Settings.game.LASER_APPEARING_CHANCE;
						break;
					case t.PowerupType.FIREBALL:
						this.chances[e] = i ? 0 : this.chances[e] < 0 ? ~~(this.chances[e] + 1) : t.Settings.game.FIREBALL_APPEARING_CHANCE
				}
			}, i.prototype.increaseChancesExcept = function(e) {
				for (var i = [t.PowerupType.LASER, t.PowerupType.LIGHTING, t.PowerupType.REWIND, t.PowerupType.SLOWDOWN, t.PowerupType.BOMB, t.PowerupType.FIREBALL], n = i.length - 1; n > -1; n--) e != i[n] && (this.chances[i[n]] <= 0 && this.clearChances(i[n]), this.chances[i[n]] *= t.Settings.game.CHANCE_APPEARING_MULTIPLIER)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null, this.powerUps = null
			}, i
		}(Phaser.Group);
		t.PowerupManager = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {
				this.currentScore = 0
			}
			return Object.defineProperty(e, "instance", {
				get: function() {
					return e._instance ? e._instance : e._instance = new e
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.init = function(t) {
				this.scores = t.slice()
			}, e.prototype.update = function() {}, e.prototype.clear = function() {
				this.currentScore = 0
			}, e.prototype.calculateScores = function(t) {
				return 10 * t
			}, e.prototype.displayScores = function(e, i, n, a, s, o, r, l, h, c) {
				void 0 === i && (i = !1), void 0 === n && (n = t.BallColor.RED), void 0 === a && (a = 0), void 0 === s && (s = 0), void 0 === o && (o = 5), void 0 === r && (r = !1), void 0 === l && (l = !1), void 0 === h && (h = .9), void 0 === c && (c = !1), i && t.App.instance.state.getCurrentState() instanceof t.Level && t.App.instance.state.getCurrentState().effectsManager.addScoresEffect(r ? Phaser.Math.random(a - 50, a + 50) : a, l ? Phaser.Math.random(s - 50, s + 50) : s, e, n, o, h, c)
			}, e.prototype.addScores = function(t) {
				this.currentScore += t
			}, e.prototype.getLevelScores = function(t) {
				return this.scores[t - 1]
			}, e.prototype.getTotalScores = function() {
				return this.scores.reduce((function(t, e) {
					return t + e
				}), 0)
			}, e.prototype.getScores = function() {
				return this.scores.slice()
			}, e.prototype.updateLevelScores = function(t, e) {
				return this.getLevelScores(t) < e && (this.scores[t - 1] = e, !0)
			}, e._instance = null, e
		}();
		t.ScoreManager = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {
				this.clear()
			}
			return Object.defineProperty(e, "instance", {
				get: function() {
					return e._instance ? e._instance : e._instance = new e
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.update = function() {
				this.time += t.App.instance.time.elapsedMS
			}, e.prototype.clear = function() {
				this.balls = 0, this.combos = 0, this.gaps = 0, this.time = 0, this.coins = 0, this.bonus = 0, this._ballsScore = 0, this._combosScore = 0, this._gapsScore = 0, this._timeScore = 0, this._bonusScore = 0
			}, e.prototype.addCoin = function() {
				this.coins += 1, t.ScoreManager.instance.addScores(1 * t.Settings.game.COIN_SCORE)
			}, e.prototype.addBalls = function(t) {
				this.balls += t
			}, e.prototype.addGaps = function(t) {
				this.gaps += t
			}, e.prototype.addCombos = function(t) {
				this.combos += t
			}, e.prototype.addComboBonusScore = function(t) {
				this._combosScore += t
			}, e.prototype.addGapBonusScore = function(t) {
				this._gapsScore += t
			}, e.prototype.addBonus = function(t) {
				this.bonus += t
			}, e.prototype.calculateReward = function() {
				return this.ballsScore + this.combosScore + this.gapsScore + this.timeScore + this.bonusScore
			}, Object.defineProperty(e.prototype, "coins", {
				get: function() {
					return this._coins
				},
				set: function(t) {
					this._coins = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "time", {
				get: function() {
					return this._time
				},
				set: function(t) {
					this._time = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "gaps", {
				get: function() {
					return this._gaps
				},
				set: function(t) {
					this._gaps = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "combos", {
				get: function() {
					return this._combos
				},
				set: function(t) {
					this._combos = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "balls", {
				get: function() {
					return this._balls
				},
				set: function(e) {
					this._balls = e, this._ballsScore = this._balls * t.Settings.game.BALL_SCORE
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "bonus", {
				get: function() {
					return this._bonus
				},
				set: function(t) {
					this._bonus = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "timeScore", {
				get: function() {
					return t.App.instance.state.getCurrentState() instanceof t.Level ? this._timeScore = 10 * t.App.instance.state.getCurrentState().pathManager.getInitialBallsCount() - t.Settings.game.TIME_BONUS_POINTS_PER_SECOND_PENALTY * ~~(this.time / 1e3) : this._timeScore = 10 * this.balls - t.Settings.game.TIME_BONUS_POINTS_PER_SECOND_PENALTY * ~~(this.time / 1e3)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "gapsScore", {
				get: function() {
					return this._gapsScore
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "combosScore", {
				get: function() {
					return this._combosScore
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "ballsScore", {
				get: function() {
					return this._ballsScore
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "bonusScore", {
				get: function() {
					return this._bonusScore = this.bonus * t.Settings.game.PATH_FINISHED_BONUS_SCORE + this.coins * t.Settings.game.COIN_SCORE
				},
				enumerable: !0,
				configurable: !0
			}), e._instance = null, e
		}();
		t.StatsManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game) || this;
				return i.level = t, i.createHandlers(), i
			}
			return __extends(i, e), i.prototype.createHandlers = function() {
				this.game.device.desktop ? t.App.instance.input.onDown.add(this.onInputTapHandler, this) : t.App.instance.input.onUp.add(this.onInputTapHandler, this)
			}, i.prototype.destroyHandlers = function() {
				t.App.instance.input.onDown.removeAll()
			}, i.prototype.onInputTapHandler = function(t) {
				this.level.gameStateManager.isPaused || t.targetObject || (this.game.device.desktop && t instanceof Phaser.Pointer ? (t.leftButton.isDown && this.level.cannonManager.handleTap(), t.rightButton.isDown && this.level.cannonManager.handleSwap()) : this.level.cannonManager.handleTap())
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.destroyHandlers(), this.level = null
			}, i
		}(Phaser.Group);
		t.TouchInputManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game) || this;
				return i.path = t, i.level = t.pathManager.level, i
			}
			return __extends(i, e), i.prototype.buildTunnels = function() {
				var e = this;
				this.tunnels = [];
				for (var i = t.LevelManager.instance.cachedLevel.tunnels.filter((function(t) {
						return t[0] == e.level.pathManager.paths.indexOf(e.path)
					})), n = 0, a = i = i.sort((function(t, e) {
						return t[1] <= e[1] ? -1 : 1
					})); n < a.length; n++) {
					var s = a[n],
						o = this.add(new t.Tunnel(this, this.path, s[1] + 1, s[2], s[3] + 1, s[4]));
					this.tunnels.push(o)
				}
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null, this.tunnels = null
			}, i
		}(Phaser.Group);
		t.TunnelManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game) || this;
				return i.currentScoreValue = 0, i.level = t, i.createButtons(), i
			}
			return __extends(i, e), i.prototype.update = function() {
				this.level.gameStateManager.isPaused || this.updateScores()
			}, i.prototype.updateScores = function(i) {
				void 0 === i && (i = .8), e.prototype.update.call(this), this.currentScoreValue != t.ScoreManager.instance.currentScore && (Math.abs(this.currentScoreValue - t.ScoreManager.instance.currentScore) < 20 ? (this.game.tweens.removeFrom(this), this.currentScoreValue = t.ScoreManager.instance.currentScore) : (this.game.tweens.removeFrom(this), this.game.add.tween(this).to({
					currentScoreValue: t.ScoreManager.instance.currentScore
				}, 180 + Math.pow(Math.abs(t.ScoreManager.instance.currentScore - this.currentScoreValue), i), Phaser.Easing.Sinusoidal.Out, !0))), this.scoresValue.text = "" + ~~this.currentScoreValue, this.scoresContainer.x = 303 - 10 * (this.scoresValue.text.length - 1), t.Settings.DISPLAY_FPS && (this.debugOutput.text = "" + this.game.time.fps)
			}, i.prototype.createButtons = function() {
				this.buttonPause = this.add(t.ButtonUtils.createButton(t.Settings.GAME_ATLAS, "buttonPause", 543.5, 31, this.pauseClicked, this)), this.levelIconLeft = this.add(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2 - (t.Settings.CURRENT_LEVEL > 9 ? 20 : 15), t.CustomScaleManager.ORIGINAL_HEIGHT - 18, t.Settings.GAME_ATLAS, "levelIcon0000")), this.levelIconLeft.anchor.set(1, .5), this.levelIconRight = this.add(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2 + (t.Settings.CURRENT_LEVEL > 9 ? 20 : 15), t.CustomScaleManager.ORIGINAL_HEIGHT - 18, t.Settings.GAME_ATLAS, "levelIcon0000")), this.levelIconRight.scale.set(-1, 1), this.levelIconRight.anchor.set(1, .5), this.levelText = this.add(t.TextUtils.getShadowText("" + t.Settings.CURRENT_LEVEL, t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT - 17, 28, "#FFFFFF", "#2E2E2E", 0, 3, .5)), this.scoresContainer = this.add(this.game.make.group(null)), this.scoresContainer.position.set(300, 34), this.scoresIcon = this.scoresContainer.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "cupIcon0000")), this.scoresIcon.scale.set(.9), this.scoresIcon.anchor.set(.5, .5), this.scoresValue = this.scoresContainer.add(t.TextUtils.getShadowText("" + t.ScoreManager.instance.currentScore, 30, 4, 42, "#FFFFFF", "#2E2E2E", 0, 3, .5)), this.scoresValue.anchor.set(0, .5), t.Settings.DISPLAY_FPS && (this.debugOutput = this.add(t.TextUtils.getShadowText("", 15, 15, 25, "#FFFFFF", "#2E2E2E", 0, 3, .5)))
			}, i.prototype.pauseClicked = function() {
				this.level.gameStateManager.pauseLevel(), this.game.sound.play("click", .9)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.level = null
			}, i
		}(Phaser.Group);
		t.UIManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(n) {
				var a = e.call(this, n.game) || this;
				return a.level = n, i.bitmapData || (i.bitmapData = a.game.make.bitmapData(t.CustomScaleManager.ORIGINAL_WIDTH, t.CustomScaleManager.ORIGINAL_HEIGHT, "levelBitmap" + t.Settings.CURRENT_LEVEL)), a.pattern = a.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "pathSegment10000"), a.pattern.anchor.set(.5), a.particle = a.game.make.sprite(0, 0, t.Settings.GAME_ATLAS), a.particle.anchor.set(.5), a.shadowLight = a.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "pathSegmentShadowLight0000"), a.shadowLight.anchor.set(.5), a.shadowDark = a.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "pathSegmentShadowDark0000"), a.shadowDark.anchor.set(.5), i.bitmapData.clear(), a.waySprite = a.add(a.game.make.sprite(0, 0, i.bitmapData)), a
			}
			return __extends(i, e), i.prototype.buildTexture = function() {
				this.drawParticles(), this.drawToBitmapData(this.shadowDark, t.Settings.PATH_SHADOW_DELTA, t.Settings.PATH_SHADOW_DELTA), this.drawToBitmapData(this.shadowLight, t.Settings.PATH_LIGHT_DELTA, t.Settings.PATH_LIGHT_DELTA), this.drawToBitmapData(this.pattern, 0, 0)
			}, i.prototype.drawParticles = function() {
				for (var t = 0, e = this.level.pathManager.paths; t < e.length; t++)
					for (var i = e[t], n = 0, a = i.tunnelManager.tunnels; n < a.length; n++)
						for (var s = a[n], o = i.calculateRelativePosition(s.startPosition, -5), r = s.endPosition, l = o >= 0 ? o : s.startPosition, h = i.getConcretePosition(o ? i.calculateRelativePosition(o, -5) : s.startPosition - 1e-5); l < r;) {
							var c = i.getConcretePosition(l),
								u = this.drawStoneParticle(c, h);
							l = i.calculateRelativePosition(l, u), h = c
						}
			}, i.prototype.drawToBitmapData = function(e, n, a) {
				for (var s = 0, o = this.level.pathManager.paths; s < o.length; s++) {
					var r = o[s],
						l = this.level.pathManager.paths.indexOf(r),
						h = gradle.path_single_color || 0 == l ? 0 : l % 2 != 0 ? 2 : 1;
					this.pattern.frameName = "pathSegment" + h + "0000", e.alpha = gradle.path_alpha;
					for (var c = 0; c < r.pathPoints.length - 1; c++) {
						var u = r.pathPoints[c],
							p = r.pathPoints[c + 1];
						if (r.isVisible(u.chainIndex))
							for (var g = 0; g < u.pathLength; g += t.Settings.PATTERN_DRAWING_INTERVAL) {
								var d = t.AdvancedMath.pointOnSegment(u.x, u.y, p.x, p.y, g);
								i.bitmapData.draw(e, d.x + n, d.y + a)
							}
					}
				}
			}, i.prototype.drawStoneParticle = function(t, e) {
				return this.particle.frameName = Math.random() > .5 ? "x10000" : "x20000", this.particle.rotation = e ? Phaser.Math.angleBetweenPoints(e, t) + Math.PI / 2 : 0, i.bitmapData.draw(this.particle, t.x, t.y), this.particle.rotation = 0, this.particle.height + this.game.rnd.integerInRange(-5, 5)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.particle = null, this.pattern = null, this.shadowLight = null, this.shadowDark = null, this.waySprite = null, this.level = null
			}, i
		}(Phaser.Group);
		t.WayManager = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {
				this.isInitialized = !1
			}
			return Object.defineProperty(e, "instance", {
				get: function() {
					return e._instance ? e._instance : e._instance = new e
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.init = function() {
				this.transitionScreen = new t.TransitionScreen, this.credits = new t.CreditsWindow, this.results = new t.ResultsWindow, this.pause = new t.PauseWindow, this.defeat = new t.DefeatWindow, this.isInitialized = !0
			}, e.prototype.resize = function() {
				this.isInitialized && (this.transitionScreen.resize(), this.credits.resize(), this.results.resize(), this.pause.resize(), this.defeat.resize())
			}, e.prototype.showCredits = function() {
				this.credits.show()
			}, e.prototype.showResults = function() {
				this.results.show()
			}, e.prototype.showPause = function() {
				this.pause.show()
			}, e.prototype.showDefeat = function() {
				this.defeat.show()
			}, e.prototype.showTutorial = function() {}, e.prototype.isTransitionActive = function() {
				return this.transitionScreen.isActive
			}, e.prototype.transitionTo = function(e, i, n) {
				void 0 === i && (i = null), void 0 === n && (n = !0), this.transitionScreen.start((function() {
					i && i(), t.App.instance.state.start(e, n)
				}))
			}, e.prototype.endTransition = function() {
				this.isTransitionActive() && this.transitionScreen.finish()
			}, e._instance = null, e
		}();
		t.WindowManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(n, a, s, o, r, l) {
				void 0 === r && (r = null), void 0 === l && (l = null);
				var h = e.call(this, t.App.instance, r || n) || this;
				return h._prev = null, h._next = null, h.id = 0, h.color = null, h.segmentProgress = 0, h.distanceToTarget = 0, h.insertionSpeedMultiplier = 1, h.previousPosition = 0, h.powerupActivator = null, h.powerupType = null, h.comboMultiplier = 1, h.comboSoundIndex = 1, h.previousScore = 0, h.gapBonus = 0, h._backwardSpeed = 0, h.isAlive = !0, h.onTheWay = !0, h.isUnderground = !1, h.touchingPrev = !0, h.id = i.ID++, h.ballManager = n, h.path = a, h.color = s, h.freeBallStartPosition = l, h.comboSoundIndex = h.game.rnd.integerInRange(0, 3), h.createContent(), h.updatePosition(o), h
			}
			return __extends(i, e), i.prototype.update = function() {
				e.prototype.update.call(this)
			}, i.prototype.updateContacts = function() {
				if (this.isAlive && this.onTheWay && this.getPrev()) {
					var t = this.isTouching(this.getPrev(), !1);
					t && !this.touchingPrev && (this.touchingPrev = t, this.ballManager.dispatchGapDestroyingBetween(this, this.getPrev())), this.touchingPrev = t
				}
			}, i.prototype.createContent = function() {
				this.view = this.add(new t.AnimatedBallView(this, this.color))
			}, i.prototype.addToParent = function() {
				this.parent && this.parent.removeChild(this), this.ballManager.add(this)
			}, i.prototype.moveTo = function(t, e) {
				this.updateRotation(), this.view.move(t - this.x, e - this.y), this.position.set(t, e), this.isUnderground = this.path.isUnderground(this.getRelativePosition()), this.visible = this.path.isVisible(this.getRelativePosition())
			}, i.prototype.updateRotation = function() {
				this.getNext() && this.getNext().onTheWay && Phaser.Math.distance(this.x, this.y, this.getNext().x, this.getNext().y) < 2 * t.Settings.BALL_DIAMETER ? this.view.ballBackground.rotation = this.game.physics.arcade.angleBetween(this, this.getNext()) : this.pathPoint && this.pathPoint.next && (this.view.ballBackground.rotation = this.game.physics.arcade.angleBetween(this.pathPoint, this.pathPoint.next))
			}, i.prototype.updatePosition = function(e) {
				if (this.isAlive)
					if (-1 != e)
						if (this.previousPosition = this.getRelativePosition(), this.pathPoint = this.path.getPathPoint(e), this.segmentProgress = t.AdvancedMath.getDecimal(e) * this.pathPoint.pathLength, this.onTheWay) {
							var i = this.path.getConcretePosition(e);
							this.moveTo(i.x, i.y)
						} else this.updateWhileInserting(e);
				else Math.abs(this.path.totalLength - this.getAbsolutePosition()) < Math.abs(this.getAbsolutePosition()) ? this.reachFinish() : this.killBall()
			}, i.prototype.updateWhileInserting = function(e) {
				var i = this.path.getConcretePosition(e);
				this.distanceToTarget = Phaser.Math.distance(this.x, this.y, i.x, i.y);
				var n = Math.max(t.Settings.game.FREE_BALL_INSERTION_SPEED, t.Settings.game.getBallSpeed() * t.Settings.game.FREE_BALL_INSERTION_SPEED_MULTIPLIER, this.ballManager.path.speedManager.getChainSpeed() * t.Settings.game.FREE_BALL_INSERTION_SPEED_MULTIPLIER) * this.insertionSpeedMultiplier * (t.Settings.REALTIME_CALCULATIONS ? this.game.time.elapsedMS / 1e3 : this.game.time.physicsElapsed),
					a = t.AdvancedMath.pointOnSegment(this.x, this.y, i.x, i.y, n);
				Phaser.Math.distance(this.x, this.y, a.x, a.y) >= this.distanceToTarget ? (this.insertIntoLine(), this.moveTo(i.x, i.y)) : this.moveTo(a.x, a.y)
			}, i.prototype.insertIntoLine = function() {
				var e = this;
				this.gapBonus = this.path.pathManager.getGapBonusesCount(this), this.distanceToTarget = 0, this.onTheWay = !0, this.addToParent(), this.game.time.events.add(t.Settings.INSERT_BALL_REACTION_DELAY, (function() {
					e.ballManager && e.ballManager.dispatchAddingBallToTheChain(e)
				}))
			}, i.prototype.stepForward = function(e) {
				if (this.isAlive) {
					var i = this.path.calculateRelativePosition(this.getRelativePosition(), e * (t.Settings.REALTIME_CALCULATIONS ? this.game.time.elapsedMS / 1e3 : this.game.time.physicsElapsed));
					this.updatePosition(i)
				}
			}, i.prototype.stepBackward = function(e) {
				if (this.isAlive) {
					var i = this.ballManager.path.calculateRelativePosition(this.getRelativePosition(), e * (t.Settings.REALTIME_CALCULATIONS ? this.game.time.elapsedMS / 1e3 : this.game.time.physicsElapsed));
					this.updatePosition(i)
				}
			}, i.prototype.getNextRelativePosition = function() {
				return this.onTheWay ? this.ballManager.path.calculateRelativePosition(this.getRelativePosition(), t.Settings.BALL_DIAMETER) : this.getPrev() && this.isTouching(this.getPrev()) ? this.distanceToTarget > t.Settings.BALL_DIAMETER ? this.getRelativePosition() : this.ballManager.path.calculateRelativePosition(this.getRelativePosition(), t.Settings.BALL_DIAMETER - this.distanceToTarget) : this.ballManager.path.calculateRelativePosition(this.getRelativePosition(), t.Settings.BALL_DIAMETER)
			}, i.prototype.getPrevRelativePosition = function() {
				return this.ballManager.path.calculateRelativePosition(this.getRelativePosition(), -t.Settings.BALL_DIAMETER)
			}, i.prototype.getRelativePosition = function() {
				return this.pathPoint && this.isAlive ? this.pathPoint.chainIndex + (this.pathPoint.pathLength > 0 ? this.segmentProgress / this.pathPoint.pathLength : 0) : -1
			}, i.prototype.getAbsolutePosition = function() {
				return this.pathPoint && this.isAlive ? this.pathPoint.startPosition + this.segmentProgress : -1
			}, i.prototype.isTouching = function(e, i) {
				return void 0 === i && (i = !0), Phaser.Math.distance(this.x, this.y, e.x, e.y) <= t.Settings.BALL_DIAMETER + (i ? 0 : 1)
			}, i.prototype.createPowerup = function(e, i) {
				void 0 === i && (i = !1), this.powerupActivator || (this.parent && this.parent instanceof Phaser.Group && this.parent.bringToTop(this), this.powerupActivator = this.view.add(new t.PowerupActivator(this, e)), this.powerupActivator.position.set(0, 0), i || (this.game.sound.play("powerup_appearing", .6), this.powerupActivator.scale.set(2.4), this.game.add.tween(this.powerupActivator.scale).to({
					x: 1,
					y: 1
				}, 550, Phaser.Easing.Sinusoidal.In, !0)))
			}, i.prototype.removePowerup = function() {
				this.powerupActivator && (this.powerupActivator.destroy(), this.powerupActivator = null), this.powerupType = null
			}, i.prototype.reachFinish = function() {
				this.ballManager.path.ballEaten(), this.killBall()
			}, i.prototype.explodeBall = function() {
				this.isAlive && (this.powerupActivator && this.powerupActivator.activate(this.ballManager.level.powerupManager), this.visible && this.ballManager.level.effectsManager.addBallExplosion(this.ballManager, this.color, this.x, this.y), this.ballManager.dispatchBallExploding(this), this.game.time.now - i.lastExplodedTimestamp > 50 && (this.game.sound.play("ball_destroying", .3), i.lastExplodedTimestamp = this.game.time.now), this.killBall())
			}, i.prototype.killBall = function() {
				this.isAlive && (this.isAlive = !1, this.getPrev() && this.getPrev().setNext(this.getNext()), this.getNext() && this.getNext().setPrev(this.getPrev()), this.setPrev(null), this.setNext(null), this.ballManager.level.cannonManager.cannon.dispatchBallDestroying(), this.destroy())
			}, i.prototype.getPrev = function() {
				return this._prev
			}, i.prototype.setPrev = function(t) {
				this._prev = t
			}, i.prototype.getNext = function() {
				return this._next
			}, i.prototype.setNext = function(t) {
				this._next = t
			}, Object.defineProperty(i.prototype, "backwardSpeed", {
				get: function() {
					return this._backwardSpeed
				},
				set: function(t) {
					this._backwardSpeed = t < 0 ? t : 0
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.path = null, this.pathPoint = null, this.ballManager = null, this.powerupActivator = null, this.view = null
			}, i.ID = 0, i.lastExplodedTimestamp = 0, i
		}(Phaser.Group);
		t.Ball = e
	}(src || (src = {})),
	function(t) {
		! function(t) {
			t[t.BLACK = 0] = "BLACK", t[t.BLUE = 1] = "BLUE", t[t.GRAY = 2] = "GRAY", t[t.GREEN = 3] = "GREEN", t[t.PURPLE = 4] = "PURPLE", t[t.CYAN = 5] = "CYAN", t[t.YELLOW = 6] = "YELLOW", t[t.RED = 7] = "RED"
		}(t.BallColor || (t.BallColor = {}))
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e(t) {
				this.isAcceleratingBackward = !1, this.ballManager = t, this.balls = []
			}
			return e.prototype.push = function(t, e) {
				void 0 === e && (e = -1), -1 == e ? this.balls.push(t) : this.balls.splice(e, 0, t)
			}, e.prototype.getFirst = function() {
				return this.balls[0]
			}, e.prototype.getLast = function() {
				return this.balls[this.balls.length - 1]
			}, e.prototype.move = function(t) {
				t > 0 ? this.moveForward(t) : t < 0 && this.moveBackward(t)
			}, e.prototype.update = function(e, i) {
				var n = this.getLast().backwardSpeed;
				(n = (n = this.isAcceleratingBackward ? (n > t.Settings.game.GAP_COLLAPSING_STARTING_SPEED * (e ? 2 : 1) ? t.Settings.game.GAP_COLLAPSING_STARTING_SPEED * (e ? 2 : 1) : n) * t.Settings.game.GAP_COLLAPSING_ACCELERATION_MULTIPLIER : (n > t.Settings.game.GAP_COLLAPSING_STARTING_SPEED / 5 ? 0 : n) / t.Settings.game.GAP_COLLAPSING_ACCELERATION_MULTIPLIER) < -t.Settings.game.GAP_COLLAPSING_MAX_SPEED ? -t.Settings.game.GAP_COLLAPSING_MAX_SPEED : n) < 0 && (this.move(n), this.getFirst().getPrev() && this.getFirst().getPrev().isTouching(this.getFirst()) && (n *= e ? .5 * t.Settings.game.GAP_COLLAPSING_HIT_SLOWDOWN_FACTOR : t.Settings.game.GAP_COLLAPSING_HIT_SLOWDOWN_FACTOR, 1 != i || e || this.ballManager.path.speedManager.setChainSpeed(6, !0))), this.balls.forEach((function(t) {
					return t.backwardSpeed = n
				}))
			}, e.prototype.moveForward = function(t) {
				var e = this.getFirst();
				for (e.stepForward(t); e;) e.getNext() && this.balls.indexOf(e.getNext()) > -1 && this.pushForward(e, e.getNext()), e = e.getNext()
			}, e.prototype.moveBackward = function(e) {
				var i = this.getFirst(),
					n = i.getNext();
				for (i.stepBackward(e); i && !i.isAlive;) i.isAlive || this.ballManager.ballFactory.pushToQueue(i.color, i.powerupType), n = (i = n) && i.getNext() && this.balls.indexOf(i.getNext()) > -1 ? i.getNext() : null, i && i.stepBackward(e);
				for (; i && i.getNext() && this.balls.indexOf(i.getNext()) > -1 && i.getNext().onTheWay;) this.pullBackward(i, i.getNext()), i = i.getNext();
				this.getFirst().getPrev() && this.getFirst().getPrev().isTouching(this.getFirst()) && t.App.instance.sound.play("gap_collapsing", .7)
			}, e.prototype.pushForward = function(t, e) {
				if (e.onTheWay) {
					var i = t.getNextRelativePosition();
					e.updatePosition(t.onTheWay ? i : Math.max(i, e.getRelativePosition()))
				}
			}, e.prototype.pullBackward = function(t, e) {
				this.pushForward(t, e)
			}, e.prototype.destroy = function() {
				this.ballManager = null, this.balls = null
			}, e
		}();
		t.BallSequence = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a, s) {
				var o = e.call(this, t.App.instance) || this;
				return o.color = null, o.speedX = 0, o.speedY = 0, o.isAlive = !0, o.isStarted = !1, o.cannonManager = i, o.color = n, o.position.set(a, s), o.createContent(), o
			}
			return __extends(i, e), i.prototype.createContent = function() {
				this.view = this.add(new t.AnimatedBallView(null, this.color))
			}, i.prototype.isTouching = function(e) {
				return Phaser.Math.distance(this.x, this.y, e.x, e.y) <= t.Settings.BALL_DIAMETER
			}, i.prototype.changeColor = function(t) {
				this.color = t, this.view && this.view.destroy(), this.createContent()
			}, i.prototype.start = function(e, i) {
				this.parent && this.parent.removeChild(this), this.game.tweens.removeFrom(this, !(this instanceof Phaser.Group)), this.game.tweens.removeFrom(this.scale), this.cannonManager.add(this);
				var n = this.position.clone().rotate(0, 0, this.cannonManager.cannon.rotation);
				this.position.set(this.cannonManager.cannon.x + n.x, this.cannonManager.cannon.y + n.y), this.scale.set(1), this.isStarted = !0, this.startPosition = this.position.clone(), this.previousPosition = this.position.clone(), this.speedX = e, this.speedY = i, this.cannonManager.level.powerupManager.hasAlivePowerups(t.PowerupType.LASER) && (this.speedX *= t.Settings.game.LASER_FREE_BALL_SPEED_MULTIPLIER, this.speedY *= t.Settings.game.LASER_FREE_BALL_SPEED_MULTIPLIER), this instanceof t.FireBall && (this.cannonManager.level.powerupManager.add(this), this.speedX = this.speedX * t.Settings.game.FIREBALL_SPEED_MULTIPLIER, this.speedY = this.speedY * t.Settings.game.FIREBALL_SPEED_MULTIPLIER), this.view.dispatchStart(e, i)
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.isStarted && (this.previousPosition.copyFrom(this.position), this.x += this.speedX * (t.Settings.REALTIME_CALCULATIONS ? this.game.time.elapsedMS / 1e3 : this.game.time.physicsElapsed), this.y += this.speedY * (t.Settings.REALTIME_CALCULATIONS ? this.game.time.elapsedMS / 1e3 : this.game.time.physicsElapsed), this.outOfScreen() && this.killBall())
			}, i.prototype.killBall = function() {
				this.isAlive = !1, this.destroy()
			}, i.prototype.outOfScreen = function() {
				return this.x < -t.Settings.BALL_DIAMETER / 2 || this.x > t.Settings.BALL_DIAMETER / 2 + t.CustomScaleManager.ORIGINAL_WIDTH || this.y < -t.Settings.BALL_DIAMETER / 2 || this.y > t.Settings.BALL_DIAMETER / 2 + t.CustomScaleManager.ORIGINAL_HEIGHT
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.cannonManager = null, this.view = null, this.startPosition = null
			}, i
		}(Phaser.Group);
		t.FreeBall = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t, i, n) {
				return e.call(this, t, null, i, n) || this
			}
			return __extends(i, e), i.prototype.createContent = function() {
				this.view = this.add(new t.FireBallView)
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.view && this.parent && this.parent.parent && this.parent.parent instanceof t.Cannon && (this.view.rotation = -this.parent.parent.rotation)
			}, i
		}(t.FreeBall);
		t.FireBall = e
	}(src || (src = {})),
	function(t) {
		var e = function(t, e) {
			this.powerup = null, this.color = t, this.powerup = e
		};
		(src || (src = {})).OncomingBall = e
	}(),
	function(t) {
		var e = function() {
			function e(t) {
				this.ballManager = t
			}
			return e.prototype.update = function() {
				if (this.ballManager.hasAliveBalls()) {
					var t = this.ballManager.path.speedManager.getChainSpeed();
					this.resolveFlyingBalls(), this.resolveOverlaps(), this.resolveSequences(t)
				}
			}, e.prototype.resolveFlyingBalls = function() {
				for (var e = 0, i = this.ballManager.getOncomingBalls(); e < i.length; e++) {
					var n = i[e];
					n.getPrev() && n.isTouching(n.getPrev()) ? n.updatePosition(this.ballManager.path.calculateRelativePosition(n.getPrev().getRelativePosition(), t.Settings.BALL_DIAMETER)) : n.getNext() && n.isTouching(n.getNext()) ? n.updatePosition(n.getNext().getPrevRelativePosition()) : n.updatePosition(n.getRelativePosition())
				}
			}, e.prototype.resolveOverlaps = function() {
				for (var t = this.ballManager.getFirstBall(); t && t.getNext();) t.getNext().onTheWay && (t.isTouching(t.getNext()) || t.getRelativePosition() > t.getNext().getRelativePosition()) && (t.onTheWay ? t.getNext().updatePosition(t.getNextRelativePosition()) : t.getNext().updatePosition(t.getPrev() ? Math.max(t.getPrev().getNextRelativePosition(), t.getNextRelativePosition(), t.getNext().getRelativePosition()) : Math.max(t.getNextRelativePosition(), t.getNext().getRelativePosition()))), t = t.getNext()
			}, e.prototype.resolveSequences = function(t) {
				var e = this.ballManager.getSequences();
				t < 0 ? e[e.length - 1].move(t) : (e[0].move(t), this.manageGaps(e)), 1 == e.length && (this.ballManager.path.speedManager.hasLightingPowerupActivated = !1), e.forEach((function(t) {
					return t.destroy()
				}))
			}, e.prototype.manageGaps = function(t) {
				for (var e = !1, i = t.length - 1; i > 0; i--) {
					var n = t[i],
						a = t[i - 1];
					n.getFirst().onTheWay && a.getLast().onTheWay && (e || n.getFirst().color != a.getLast().color ? this.ballManager.path.speedManager.hasLightingPowerupActivated && (n.isAcceleratingBackward = !0) : (e = !0, n.isAcceleratingBackward = !0))
				}
				for (i = t.length - 1; i > -1; i--) t[i].update(this.ballManager.path.speedManager.hasLightingPowerupActivated, i)
			}, e.prototype.destroy = function() {
				this.ballManager = null
			}, e
		}();
		t.BallContactResolver = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e(t) {
				this.countdown = 1e3, this.totalBalls = 0, this.ballManager = t
			}
			return e.getRandomColor = function() {
				return Phaser.ArrayUtils.getRandomItem([t.BallColor.BLUE, t.BallColor.GRAY, t.BallColor.GREEN, t.BallColor.PURPLE, t.BallColor.CYAN, t.BallColor.YELLOW, t.BallColor.RED])
			}, e.prototype.createQueue = function(e) {
				this.ballsQueue = [];
				for (var i = 0; i < e.length; i++) this.ballsQueue.push(new t.OncomingBall(e[i], null));
				var n = Math.floor(Math.random() * this.ballsQueue.length);
				this.ballsQueue = this.ballsQueue.concat(this.ballsQueue.splice(0, n)), this.totalBalls = this.ballsQueue.length
			}, e.prototype.clearQueue = function(t) {
				void 0 === t && (t = 0), this.ballsQueue.length > t && this.ballsQueue.splice(t)
			}, e.prototype.pushToQueue = function(e, i) {
				this.ballsQueue.push(new t.OncomingBall(e, i))
			}, e.prototype.update = function() {
				if (this.ballManager.path.isStarted)
					if (this.countdown > 0) this.countdown -= t.App.instance.time.elapsedMS;
					else if (this.ballManager.path.speedManager.getChainSpeed() >= 0)
					for (; this.ballsQueue.length > 0 && this.hasEmptyPlaceForABall();) this.insertBallFromQueue()
			}, e.prototype.insertBallBefore = function(e, i, n, a, s, o) {
				var r = i.getPrev(),
					l = new t.Ball(this.ballManager, e, n, i.getPrevRelativePosition(), this.ballManager.level.cannonManager, o);
				return l.onTheWay = !1, l.position.set(a, s), l.insertionSpeedMultiplier = .75, i.setPrev(l), l.setNext(i), r ? (l.setPrev(r), r.setNext(l), this.ballManager.balls.splice(this.ballManager.balls.indexOf(i), 0, l)) : this.ballManager.balls.unshift(l), this.ballManager.level.cannonManager.cannon.dispatchBallCreating(), this.ballManager.game.sound.play("ball_inserting", .25), l
			}, e.prototype.insertBallAfter = function(e, i, n, a, s, o) {
				var r = i.getNext(),
					l = r ? r.getRelativePosition() : i.getNextRelativePosition();
				if (-1 == l) return null;
				var h = new t.Ball(this.ballManager, e, n, l, this.ballManager.level.cannonManager, o);
				return h.onTheWay = !1, h.position.set(a, s), i.setNext(h), h.setPrev(i), r ? (h.setNext(r), r.setPrev(h), this.ballManager.balls.splice(this.ballManager.balls.indexOf(r), 0, h)) : this.ballManager.balls.push(h), this.ballManager.level.cannonManager.cannon.dispatchBallCreating(), this.ballManager.game.sound.play("ball_inserting", .25), h
			}, e.prototype.hasEmptyPlaceForABall = function() {
				return !this.ballManager.hasAliveBalls() || this.ballManager.getFirstBall().pathPoint.chainIndex >= 1
			}, e.prototype.insertBallFromQueue = function() {
				if (this.ballsQueue.length > 0) {
					var e = this.ballManager.getFirstBall(),
						i = 0;
					e && (i = e.getPrevRelativePosition() >= 0 && e.getPrevRelativePosition() <= 1 ? e.getPrevRelativePosition() : 0);
					var n = this.ballsQueue.pop(),
						a = new t.Ball(this.ballManager, this.ballManager.path, n.color, i);
					n.powerup && a.createPowerup(n.powerup, !0), e && (a.setNext(e), e.setPrev(a)), this.ballManager.level.cannonManager.cannon.dispatchBallCreating(), this.ballManager.balls.unshift(a)
				}
			}, e.prototype.destroy = function() {
				this.ballManager = null
			}, e
		}();
		t.BallFactory = e
	}(src || (src = {})),
	function(t) {
		var e = function(t) {
			function e(e) {
				var i = t.call(this, e.game, null) || this;
				return i.ballManager = e, i
			}
			return __extends(e, t), e.prototype.render = function() {
				for (var t = 0, e = this.ballManager.balls; t < e.length; t++) {
					var i = e[t];
					i.isAlive && i.visible
				}
			}, e
		}(Phaser.Group);
		t.BallRenderer = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				var i = e.call(this, t.App.instance, null) || this;
				return i.isStarted = !1, i
			}
			return __extends(i, e), i.prototype.dispatchStart = function(t, e) {
				this.isStarted = !0
			}, i
		}(Phaser.Group);
		t.BallView = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t, i) {
				var n = e.call(this) || this;
				return n.textureSpeed = 0, n.ballFrame = 0, n.ball = t, n.color = i, n.createContent(), n
			}
			return __extends(i, e), i.prototype.createContent = function() {
				this.ballBackground = this.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "ball" + this.color + "0000")), this.ballBackground.anchor.set(.5), this.rollingAnimation = this.ballBackground.animations.add("rollingAnimation", i.ballAnimations[this.color], 60, !0), this.rollingAnimation.play(), this.rollingAnimation.stop(), this.cover = this.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "ballCover0000")), this.cover.anchor.set(.5)
			}, i.prototype.move = function(t, e) {
				if (this.textureSpeed = Phaser.Math.distance(0, 0, t, e), this.ball && this.ball.isAlive && this.ball.previousPosition > this.ball.getRelativePosition())
					for (this.ballFrame -= this.textureSpeed; Math.round(this.ballFrame) < 0;) this.ballFrame += 44;
				else
					for (this.ballFrame += this.textureSpeed; Math.round(this.ballFrame) > 43;) this.ballFrame -= 44;
				this.rollingAnimation.frame = Math.round(this.ballFrame)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.color = null, this.cover = null, this.ballBackground = null, this.ball = null, this.rollingAnimation = null
			}, i.ballAnimations = [Phaser.Animation.generateFrameNames("ball0", 0, 43, "", 4), Phaser.Animation.generateFrameNames("ball1", 0, 43, "", 4), Phaser.Animation.generateFrameNames("ball2", 0, 43, "", 4), Phaser.Animation.generateFrameNames("ball3", 0, 43, "", 4), Phaser.Animation.generateFrameNames("ball4", 0, 43, "", 4), Phaser.Animation.generateFrameNames("ball5", 0, 43, "", 4), Phaser.Animation.generateFrameNames("ball6", 0, 43, "", 4), Phaser.Animation.generateFrameNames("ball7", 0, 43, "", 4)], i
		}(t.BallView);
		t.AnimatedBallView = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				var t = e.call(this) || this;
				return t.createContent(), t
			}
			return __extends(i, e), i.prototype.createContent = function() {
				this.ball = this.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "fireBall0000")), this.ball.anchor.set(.5), this.fireAnimation = this.ball.animations.add("fireBall", Phaser.Animation.generateFrameNames("fireBall", 0, 15, "", 4)), this.fireAnimation.play(60, !0), this.tail = this.addAt(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, null), 0), this.tail.anchor.set(.5, .1), this.tail.visible = !1, this.tailAnimation = this.tail.animations.add("fireBallTail", Phaser.Animation.generateFrameNames("fireBallTail", 0, 19, "", 4))
			}, i.prototype.move = function(t, e) {}, i.prototype.dispatchStart = function(t, i) {
				e.prototype.dispatchStart.call(this, t, i), this.rotation = 0, this.tail.visible = !0, this.tailAnimation.play(120, !0), this.tail.rotation = Phaser.Math.angleBetween(0, 0, t, i) + Math.PI / 2
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.ball = null, this.fireAnimation = null
			}, i
		}(t.BallView);
		t.FireBallView = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				var a = e.call(this, t.App.instance) || this;
				return a.activeBall = null, a.nextBall = null, a.lastColors = [], a.cooldown = 0, a.isReady = !1, a.cannonManager = i, a.commonContainer = a.add(a.game.make.group(null)), a.platform = n, a.position.copyFrom(a.platform.position), a.buildGraphics(), a
			}
			return __extends(i, e), i.prototype.start = function() {
				this.generateBalls(), this.isReady = !0
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.cooldown > 0 ? (this.cooldown -= this.game.time.elapsedMS, this.isReady = !1) : this.isReady = !0
			}, i.prototype.rotateToPointer = function(t) {
				this.rotation = Phaser.Math.angleBetween(this.x, this.y, t.x, t.y) + Math.PI / 2
			}, i.prototype.isPointerOver = function(e) {
				return Phaser.Math.distance(e.x, e.y, this.x, this.y) < t.Settings.CANNON_TOUCH_ZONE_DIAMETER / 2
			}, i.prototype.shoot = function() {
				this.activeBall && (this.rotateToPointer(this.cannonManager.level.getInputPosition()), this.activeBall instanceof t.FireBall && (this.game.sound.play("shot0" + (1 + Math.floor(2 * Math.random())), .5), this.game.sound.play("fireball_shot", .6), this.shootBall(new t.FireBall(this.cannonManager, t.Settings.ACTIVE_BALL_POSITION.x, t.Settings.ACTIVE_BALL_POSITION.y), -Phaser.Math.degToRad(t.Settings.game.FIREBALL_ANGLE)), this.shootBall(new t.FireBall(this.cannonManager, t.Settings.ACTIVE_BALL_POSITION.x, t.Settings.ACTIVE_BALL_POSITION.y), Phaser.Math.degToRad(t.Settings.game.FIREBALL_ANGLE))), this.shootBall(this.activeBall), this.game.sound.play("shot0" + (1 + Math.floor(2 * Math.random())), .3), t.TutorialManager.instance.dispatchShoot(this.cannonManager.level.getInputPosition().clone()), this.cooldown = this.cannonManager.level.powerupManager.hasAlivePowerups(t.PowerupType.LASER) ? t.Settings.game.ZOOMER_COOLDOWN / 2 : t.Settings.game.ZOOMER_COOLDOWN, this.activeBall = this.nextBall, this.game.add.tween(this.activeBall).to({
					x: t.Settings.ACTIVE_BALL_POSITION.x,
					y: t.Settings.ACTIVE_BALL_POSITION.y
				}, 200, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this.activeBall.scale).to({
					x: 1,
					y: 1
				}, 300, Phaser.Easing.Back.Out, !0), this.nextBall = this.ballsContainer.add(new t.FreeBall(this.cannonManager, this.getNextColor(), t.Settings.NEXT_BALL_POSITION.x, t.Settings.NEXT_BALL_POSITION.y)), this.nextBall.scale.set(.01), this.game.add.tween(this.nextBall.scale).to({
					x: t.Settings.NEXT_BALL_SCALE,
					y: t.Settings.NEXT_BALL_SCALE
				}, 100, Phaser.Easing.Linear.None, !0), this.ballsContainer.bringToTop(this.activeBall), this.playRecoilAnimation())
			}, i.prototype.swapBalls = function() {
				var e;
				this.activeBall && this.nextBall && (t.TutorialManager.instance.dispatchBallsSwap(this), t.SoundController.instance.playSwapSound(), e = [this.nextBall, this.activeBall], this.activeBall = e[0], this.nextBall = e[1], this.game.add.tween(this.activeBall).to({
					x: t.Settings.ACTIVE_BALL_POSITION.x,
					y: t.Settings.ACTIVE_BALL_POSITION.y
				}, 180, Phaser.Easing.Quintic.InOut, !0), this.game.add.tween(this.activeBall.scale).to({
					x: 1,
					y: 1
				}, 180, Phaser.Easing.Quintic.InOut, !0), this.game.add.tween(this.nextBall).to({
					x: t.Settings.NEXT_BALL_POSITION.x,
					y: t.Settings.NEXT_BALL_POSITION.y
				}, 180, Phaser.Easing.Quintic.InOut, !0), this.game.add.tween(this.nextBall.scale).to({
					x: t.Settings.NEXT_BALL_SCALE,
					y: t.Settings.NEXT_BALL_SCALE
				}, 180, Phaser.Easing.Quintic.InOut, !0))
			}, i.prototype.jumpToPlatform = function(e) {
				var i = this;
				e != this.platform && (t.TutorialManager.instance.dispatchPlatformChange(e), this.game.tweens.removeFrom(e.platformBorder.scale), e.platformBorder.scale.set(.85), this.platform = e, this.game.sound.play("platform_change", .6), this.game.add.tween(this.scale).to({
					x: .6,
					y: .6
				}, 80, Phaser.Easing.Sinusoidal.In, !0).onComplete.add((function() {
					return i.game.add.tween(i.scale).to({
						x: 1,
						y: 1
					}, 80, Phaser.Easing.Sinusoidal.Out, !0).onStart.add((function() {
						i.position.copyFrom(i.platform.position)
					}))
				})), this.game.add.tween(this).to({
					alpha: 0
				}, 80, Phaser.Easing.Sinusoidal.In, !0).onComplete.add((function() {
					return i.game.add.tween(i).to({
						alpha: 1
					}, 80, Phaser.Easing.Sinusoidal.Out, !0)
				})))
			}, i.prototype.activateFireBall = function() {
				this.activeBall && (this.activeBall.destroy(), this.activeBall = null), this.activeBall = this.ballsContainer.add(new t.FireBall(this.cannonManager, t.Settings.ACTIVE_BALL_POSITION.x, t.Settings.ACTIVE_BALL_POSITION.y)), this.activeBall.scale.set(.1), this.game.add.tween(this.activeBall.scale).to({
					x: 1,
					y: 1
				}, 180, Phaser.Easing.Quintic.InOut, !0), this.addFireballAppearingEffect(this.activeBall), this.game.sound.play("fireball_picking_up", .7)
			}, i.prototype.dispatchBallDestroying = function() {
				if (!this.cannonManager.level.gameStateManager.hasLosingPaths) {
					var e = this.cannonManager.level.pathManager.getAvailableColorsArray();
					if (0 == e.length) return this.cannonManager.level.coinManager.hideAllCoins(), void this.destroyBalls();
					this.activeBall instanceof t.FireBall || -1 != e.indexOf(this.activeBall.color) || this.activeBall.changeColor(this.cannonManager.getNextColor(null)), this.nextBall instanceof t.FireBall || -1 != e.indexOf(this.nextBall.color) || this.nextBall.changeColor(this.cannonManager.getNextColor(null))
				}
			}, i.prototype.dispatchBallCreating = function() {
				this.generateBalls()
			}, i.prototype.buildGraphics = function() {
				this.bottomSprite = this.commonContainer.add(this.game.make.sprite(2, -52, t.Settings.GAME_ATLAS, "cannonBot0000")), this.bottomSprite.anchor.set(.5, .5), this.ballsContainer = this.commonContainer.add(this.game.make.group()), this.ballsContainer.inputEnableChildren = !1, this.topSprite = this.commonContainer.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "cannonTop0000")), this.topSprite.anchor.set(.5, .5)
			}, i.prototype.addFireballAppearingEffect = function(e) {
				var i = e.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS));
				i.anchor.set(.5), i.scale.set(.65), i.animations.add("bombExplosion", Phaser.Animation.generateFrameNames("bombExplosion", 0, 17, "", 4)), i.animations.play("bombExplosion", 60, !1, !0)
			}, i.prototype.playRecoilAnimation = function() {
				var e = this;
				this.commonContainer.y = 0, this.game.tweens.removeFrom(this.commonContainer), this.game.add.tween(this.commonContainer).to({
					y: t.Settings.game.ZOOMER_RECOIL
				}, t.Settings.game.ZOOMER_RECOIL_DURATION, Phaser.Easing.Linear.None, !0).onComplete.add((function() {
					e.game.add.tween(e.commonContainer).to({
						y: 0
					}, t.Settings.game.ZOOMER_RECOIL_DURATION, Phaser.Easing.Linear.None, !0)
				}))
			}, i.prototype.generateBalls = function() {
				this.activeBall && this.nextBall || (this.ballsContainer.removeAll(!0), this.activeBall = this.ballsContainer.add(new t.FreeBall(this.cannonManager, this.cannonManager.getFirstColor(), t.Settings.ACTIVE_BALL_POSITION.x, t.Settings.ACTIVE_BALL_POSITION.y)), this.activeBall.scale.set(0), this.game.add.tween(this.activeBall.scale).to({
					x: 1,
					y: 1
				}, 300, Phaser.Easing.Back.Out, !0), this.nextBall = this.ballsContainer.add(new t.FreeBall(this.cannonManager, this.getNextColor(), t.Settings.NEXT_BALL_POSITION.x, t.Settings.NEXT_BALL_POSITION.y)), this.nextBall.scale.set(0), this.game.add.tween(this.nextBall.scale).to({
					x: t.Settings.NEXT_BALL_SCALE,
					y: t.Settings.NEXT_BALL_SCALE
				}, 300, Phaser.Easing.Linear.None, !0))
			}, i.prototype.getNextColor = function() {
				var e = this.cannonManager.getNextColor(this.lastColors.length >= t.Settings.game.ZOOMER_MAX_SAME_COLOR_BALLS_SEQUENCE ? this.lastColors[0] : null);
				return this.lastColors.length > 0 && this.lastColors[this.lastColors.length - 1] != e && this.lastColors.splice(0, this.lastColors.length), this.lastColors.push(e), e
			}, i.prototype.destroyBalls = function() {
				this.activeBall && (this.cannonManager.level.effectsManager.addBallExplosion(this.ballsContainer, this.activeBall.color, this.activeBall.x, this.activeBall.y), this.activeBall.destroy()), this.nextBall && (this.cannonManager.level.effectsManager.addBallExplosion(this.ballsContainer, this.nextBall.color, this.nextBall.x, this.nextBall.y).scale.copyFrom(this.nextBall.scale), this.nextBall.destroy()), this.activeBall = null, this.nextBall = null
			}, i.prototype.shootBall = function(e, i) {
				void 0 === i && (i = 0), this.cannonManager.balls.push(e), e.position.set(t.Settings.ACTIVE_BALL_POSITION.x, t.Settings.ACTIVE_BALL_POSITION.y), e.start(Math.sin(this.rotation + i) * t.Settings.game.FREE_BALL_SPEED, -Math.cos(this.rotation + i) * t.Settings.game.FREE_BALL_SPEED)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.activeBall = null, this.nextBall = null, this.cannonManager = null, this.platform = null
			}, i
		}(Phaser.Group);
		t.Cannon = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a) {
				var s = e.call(this, t.App.instance, null) || this;
				return s.cannonManager = i, s.position.set(n, a), s.platformBackground = s.add(s.game.make.sprite(-1, 1.5, t.Settings.GAME_ATLAS, "platformBackground0000")), s.platformBackground.anchor.set(.5), s.platformBorder = s.add(s.game.make.sprite(-2, -2, t.Settings.GAME_ATLAS, "platformBorder0000")), s.platformBorder.anchor.set(.5), s.platformBorder.scale.set(.85), s.platform = s.add(s.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "platform0000")), s.platform.anchor.set(.5), s
			}
			return __extends(i, e), i.prototype.handleTap = function(e) {
				return !!(Phaser.Math.distance(this.x, this.y, e.x, e.y) < t.Settings.PLATFORM_TOUCH_ZONE_DIAMETER / 2 && this.cannonManager.cannon && this.cannonManager.cannon.platform != this)
			}, i.prototype.highlight = function() {
				this.platformBorder.rotation = 0;
				var e = this.game.add.tween(this.platformBorder.scale).to({
						x: 1,
						y: 1
					}, 300, Phaser.Easing.Linear.None, !0),
					i = this.game.add.tween(this.platformBorder.scale).to({
						x: .85,
						y: .85
					}, 300, Phaser.Easing.Linear.None, !1, t.Settings.PLATFORM_ROTATION_TIME);
				e.chain(i)
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.platformBorder.scale.x > .85 && (this.platformBorder.rotation += t.Settings.PLATFORM_ROTATION_SPEED * this.game.time.elapsedMS / 1e3)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.onChildInputDown.removeAll(), this.cannonManager = null
			}, i
		}(Phaser.Group);
		t.Platform = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				var a = e.call(this, t.App.instance, null) || this;
				return a.lifetime = t.Settings.game.COIN_LIFETIME, a.isAlive = !0, a.coinManager = i, a.coinPlace = n, a.x = n.x, a.y = n.y, a.coinPlace.setCoin(a), a.buildSprites(), a.startTweens(), a
			}
			return __extends(i, e), i.prototype.update = function() {
				e.prototype.update.call(this), this.lifetime -= this.game.time.elapsedMS, this.lifetime < 1e3 && this.lifetime > 0 && (this.alpha = this.lifetime / 1e3), this.lifetime < 0 && this.destroy()
			}, i.prototype.buildSprites = function() {
				this.coinShadow = this.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "coinShadow0000")), this.coinShadow.anchor.set(.5), this.coin = this.add(this.game.make.sprite(0, -35, t.Settings.GAME_ATLAS)), this.coin.anchor.set(.5), this.coinAnimation = this.coin.animations.add("coinRotation", Phaser.Animation.generateFrameNames("coin", 0, 27, "", 4)), this.coinAnimation.play(60, !0)
			}, i.prototype.startTweens = function() {
				this.scale.set(.1), this.game.add.tween(this.scale).to({
					x: 1,
					y: 1
				}, 250, Phaser.Easing.Back.Out, !0)
			}, i.prototype.isTouching = function(e) {
				return Phaser.Math.distance(this.x, this.y - 35, e.x, e.y) <= .8 * t.Settings.BALL_DIAMETER
			}, i.prototype.pickupCoin = function() {
				t.StatsManager.instance.addCoin(), this.coinManager.level.effectsManager.addCoinExplosion(this.x, this.y), this.destroy()
			}, i.prototype.destroy = function() {
				this.isAlive && (this.isAlive = !1, e.prototype.destroy.call(this), this.coinPlace.removeCoin(), this.coinPlace = null, this.coinManager = null, this.coin = null, this.coinShadow = null, this.coinAnimation = null)
			}, i
		}(Phaser.Group);
		t.Coin = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function t(t, e) {
				this.coin = null, this.x = t, this.y = e
			}
			return t.prototype.setCoin = function(t) {
				this.coin = t
			}, t.prototype.removeCoin = function() {
				this.coin && (this.coin = null)
			}, t
		}();
		t.CoinPlace = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a, s, o) {
				var r = e.call(this, t.App.instance, null) || this;
				return r.state = t.DaemonState.CLOSED, r.daemonManager = i, r.path = n, r.position.set(a, s), r.rotation = o, r.buildSprites(), r.buildAnimations(), r
			}
			return __extends(i, e), i.prototype.buildSprites = function() {
				this.daemonBot = this.daemonManager.level.backgroundManager.add(this.game.make.sprite(this.x, this.y, t.Settings.GAME_ATLAS, "daemonBot0000")), this.daemonBot.anchor.set(.5, .5), this.daemonBot.rotation = this.rotation, this.daemonLowerTeeth = this.daemonManager.level.wayManager.add(this.game.make.sprite(this.x, this.y, t.Settings.GAME_ATLAS, "daemonLowerTeeth0000")), this.daemonLowerTeeth.anchor.set(.52, .12), this.daemonLowerTeeth.rotation = this.rotation, this.daemonUpperTeeth = this.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "daemonUpperTeeth0000")), this.daemonUpperTeeth.anchor.set(.525, .66), this.daemonLight = this.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "daemonLight0000")), this.daemonLight.anchor.set(.5, .9), this.daemonTop = this.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "daemonTop0000")), this.daemonTop.anchor.set(.5, .755), this.daemonEyeLeft = this.add(this.game.make.sprite(-28, 0, t.Settings.GAME_ATLAS, "daemonEye0000")), this.daemonEyeLeft.anchor.set(.5, 1.15), this.daemonEyeRight = this.add(this.game.make.sprite(24.5, 0, t.Settings.GAME_ATLAS, "daemonEye0000")), this.daemonEyeRight.anchor.set(.5, 1.16), this.daemonEyeRight.scale.set(-1, 1)
			}, i.prototype.buildAnimations = function() {
				var e = this;
				this.leftEyeOpeningAnimation = this.daemonEyeLeft.animations.add("leftEyeOpeningAnimation", Phaser.Animation.generateFrameNames("daemonEye", 0, 45, "", 4), 60, !1), this.leftEyeClosingAnimation = this.daemonEyeLeft.animations.add("leftEyeClosingAnimation", Phaser.Animation.generateFrameNames("daemonEye", 0, 45, "", 4).reverse(), 60, !1), this.rightEyeOpeningAnimation = this.daemonEyeRight.animations.add("rightEyeOpeningAnimation", Phaser.Animation.generateFrameNames("daemonEye", 0, 45, "", 4), 60, !1), this.rightEyeClosingAnimation = this.daemonEyeRight.animations.add("rightEyeClosingAnimation", Phaser.Animation.generateFrameNames("daemonEye", 0, 45, "", 4).reverse(), 60, !1), this.lightOpeningAnimation = this.daemonLight.animations.add("lightOpeningAnimation", Phaser.Animation.generateFrameNames("daemonLight", 0, 31, "", 4), 60, !1), this.lightClosingAnimation = this.daemonLight.animations.add("lightClosingAnimation", Phaser.Animation.generateFrameNames("daemonLight", 0, 31, "", 4).reverse(), 60, !1), this.upperTeethOpeningAnimation = this.daemonUpperTeeth.animations.add("upperTeethOpeningAnimation", Phaser.Animation.generateFrameNames("daemonUpperTeeth", 0, 34, "", 4), 60, !1), this.upperTeethClosingAnimation = this.daemonUpperTeeth.animations.add("upperTeethClosingAnimation", Phaser.Animation.generateFrameNames("daemonUpperTeeth", 0, 34, "", 4).reverse(), 60, !1), this.lowerTeethOpeningAnimation = this.daemonLowerTeeth.animations.add("lowerTeethOpeningAnimation", Phaser.Animation.generateFrameNames("daemonLowerTeeth", 0, 32, "", 4), 60, !1), this.lowerTeethClosingAnimation = this.daemonLowerTeeth.animations.add("lowerTeethClosingAnimation", Phaser.Animation.generateFrameNames("daemonLowerTeeth", 0, 32, "", 4).reverse(), 60, !1), this.lowerTeethOpeningAnimation.onStart.add((function() {
					return e.state = t.DaemonState.OPENING
				})), this.lowerTeethOpeningAnimation.onComplete.add((function() {
					return e.state = t.DaemonState.OPENED
				})), this.lowerTeethClosingAnimation.onStart.add((function() {
					return e.state = t.DaemonState.CLOSING
				})), this.lowerTeethClosingAnimation.onComplete.add((function() {
					return e.state = t.DaemonState.CLOSED
				}))
			}, i.prototype.openMouth = function(t) {
				void 0 === t && (t = !0), this.lightOpeningAnimation.play(), this.upperTeethOpeningAnimation.play(), this.lowerTeethOpeningAnimation.play(), this.leftEyeOpeningAnimation.play(), this.rightEyeOpeningAnimation.play(), t && this.game.sound.play("idol_mouth_opening", .5)
			}, i.prototype.closeMouth = function(t) {
				void 0 === t && (t = !0), this.lightClosingAnimation.play(), this.upperTeethClosingAnimation.play(), this.lowerTeethClosingAnimation.play(), this.leftEyeClosingAnimation.play(), this.rightEyeClosingAnimation.play(), t && this.game.sound.play("idol_mouth_closing", .4)
			}, i.prototype.update = function() {
				e.prototype.update.call(this);
				var i = this.path.ballManager.getAliveBallsCount();
				this.state != t.DaemonState.OPENED && this.state != t.DaemonState.OPENING || (i > 0 && this.path.ballManager.getFirstBall().getRelativePosition() >= this.path.pathPoints.length - 2 || i > 0 && Phaser.Math.distance(this.path.ballManager.getLastBall().x, this.path.ballManager.getLastBall().y, this.x, this.y) > t.Settings.game.getBallSpeed() && this.path.ballManager.getLastBall().getRelativePosition() < this.path.calculateRelativePosition(this.path.pathPoints.length - 2, -t.Settings.game.getBallSpeed()) || this.path.isStarted && 0 == i) && this.closeMouth(), this.state != t.DaemonState.CLOSED && this.state != t.DaemonState.CLOSING || (this.path.isStarted ? i > 0 && this.path.ballManager.getFirstBall().getRelativePosition() < this.path.pathPoints.length - 2 && Phaser.Math.distance(this.path.ballManager.getLastBall().x, this.path.ballManager.getLastBall().y, this.x, this.y) < t.Settings.game.getBallSpeed() && this.path.ballManager.getLastBall().getRelativePosition() >= this.path.calculateRelativePosition(this.path.pathPoints.length - 2, -t.Settings.game.getBallSpeed()) && this.openMouth() : this.openMouth(!1))
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.daemonBot.destroy(), this.daemonLowerTeeth.destroy(), this.daemonManager = null, this.path = null, this.daemonEyeLeft = null, this.daemonEyeRight = null, this.daemonLowerTeeth = null, this.daemonUpperTeeth = null, this.daemonLight = null, this.daemonTop = null, this.daemonBot = null, this.leftEyeOpeningAnimation = null, this.leftEyeClosingAnimation = null, this.rightEyeOpeningAnimation = null, this.rightEyeClosingAnimation = null, this.lightOpeningAnimation = null, this.lightClosingAnimation = null, this.upperTeethOpeningAnimation = null, this.upperTeethClosingAnimation = null, this.lowerTeethOpeningAnimation = null, this.lowerTeethClosingAnimation = null
			}, i
		}(Phaser.Group);
		t.Daemon = e
	}(src || (src = {})),
	function(t) {
		! function(t) {
			t[t.CLOSING = 1] = "CLOSING", t[t.CLOSED = 2] = "CLOSED", t[t.OPENING = 3] = "OPENING", t[t.OPENED = 4] = "OPENED"
		}(t.DaemonState || (t.DaemonState = {}))
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a, s, o, r) {
				void 0 === s && (s = 0), void 0 === o && (o = 5), void 0 === r && (r = 0);
				var l = e.call(this, t.App.instance, n, a) || this;
				return l.prev = null, l.next = null, l.startPosition = 0, l.pathLength = 0, l.chainIndex = 0, l.parentGroup = i, l.radius = o, l.color = r, l.chainIndex = s, l.drawContent(), l
			}
			return __extends(i, e), i.prototype.drawContent = function() {
				this.clear(), this.beginFill(this.color, 1), this.drawCircle(0, 0, this.radius), this.endFill()
			}, i.prototype.drawPath = function() {
				this.lineStyle(1, this.color, .7).moveTo(0, 0).lineTo(this.next.x - this.x, this.next.y - this.y)
			}, i.prototype.calculateLength = function() {
				this.pathLength = Phaser.Math.distance(this.x, this.y, this.next.x, this.next.y), this.next.startPosition = this.startPosition + this.pathLength
			}, i.prototype.setPrev = function(t) {
				this.prev = t
			}, i.prototype.setNext = function(t) {
				this.next = t, this.next && (this.calculateLength(), this.drawPath())
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.prev = null, this.next = null, this.parentGroup = null
			}, i
		}(Phaser.Graphics);
		t.PathPoint = e
	}(src || (src = {})),
	function(t) {
		var e = function(t) {
			function e(e, i, n, a, s) {
				return void 0 === a && (a = 15), void 0 === s && (s = 16711680), t.call(this, e, i, n, 0, a, s) || this
			}
			return __extends(e, t), e
		}(t.PathPoint);
		t.KeyPoint = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i) {
				var n = e.call(this, i.game) || this;
				return n.totalLength = 0, n.warningPosition = 0, n.hasEatenBalls = !1, n.isStarted = !1, n.isCleared = !1, n.isFinished = !1, n.isLost = !1, n.pathManager = i, n.pathInitializer = n.add(new t.PathInitializer(n)), n.pathFinalizer = n.add(new t.PathFinalizer(n)), n.ballManager = n.add(new t.BallManager(n)), n.tunnelManager = n.add(new t.TunnelManager(n)), n.speedManager = new t.PathSpeedManager(n), n
			}
			return __extends(i, e), i.prototype.construct = function(e, i, n, a) {
				this.buildPathPoints(e, i, n), this.ballManager.initQueue(a), this.totalLength = this.getEndPoint().startPosition, this.warningPosition = this.totalLength - t.Settings.game.SLOWDOWN_POINT_BALLS_COUNT * t.Settings.BALL_DIAMETER, this.tunnelManager.buildTunnels()
			}, i.prototype.start = function() {
				this.isStarted = !0, this.speedManager.start(), this.daemon.closeMouth()
			}, i.prototype.pathCleared = function() {
				this.pathManager.pathCleared(this)
			}, i.prototype.ballEaten = function() {
				var t = this;
				this.hasEatenBalls || (this.hasEatenBalls = !0, this.ballManager.ballFactory.clearQueue(10), this.game.time.events.add(1300, (function() {
					return t.pathManager.dispatchPathLose(t)
				})))
			}, i.prototype.lose = function() {
				this.isLost || (this.isLost = !0, this.pathManager.dispatchPathLose(this))
			}, i.prototype.getStartPoint = function() {
				return this.pathPoints.length > 0 ? this.pathPoints[0] : null
			}, i.prototype.getEndPoint = function() {
				return this.pathPoints.length > 0 ? this.pathPoints[this.pathPoints.length - 1] : null
			}, i.prototype.getTotalLength = function() {
				return this.pathPoints.length > 0 ? this.pathPoints.length - 1e-7 : 0
			}, i.prototype.getPathPoint = function(t) {
				return t >= 0 && this.pathPoints.length > ~~t ? this.pathPoints[~~t] : null
			}, i.prototype.isUnderground = function(t) {
				if (t >= this.pathPoints.length - 2) return !0;
				for (var e = 0, i = this.tunnelManager.tunnels; e < i.length; e++) {
					var n = i[e];
					if (t >= n.entrancePosition && t <= n.exitPosition) return !0
				}
				return !1
			}, i.prototype.isVisible = function(t) {
				for (var e = 0, i = this.tunnelManager.tunnels; e < i.length; e++) {
					var n = i[e];
					if (t >= n.startPosition && t <= n.endPosition) return !1
				}
				return !0
			}, i.prototype.getConcretePosition = function(e) {
				if (0 == this.pathPoints.length || e < 0 || this.pathPoints.length <= e) return null;
				var i = this.pathPoints[~~e];
				return i ? i.next ? t.AdvancedMath.pointOnSegmentRelative(i.x, i.y, i.next.x, i.next.y, t.AdvancedMath.getDecimal(e)) : i.position.clone() : null
			}, i.prototype.calculateRelativePosition = function(e, i) {
				var n = this.getPathPoint(e),
					a = t.AdvancedMath.getDecimal(e) * n.pathLength;
				if (i >= 0) {
					for (; n && a + i >= n.pathLength;) i -= n.pathLength - a, a = 0, n = n.next;
					return n ? (a += i, n.chainIndex + (n.pathLength > 0 ? a / n.pathLength : 0)) : -1
				}
				for (var s = Math.abs(i); n && a - s < 0;) s -= a, (n = n.prev) && (a = n.pathLength);
				return n ? (a -= s, n.chainIndex + (n.pathLength > 0 ? a / n.pathLength : 0)) : -1
			}, i.prototype.update = function() {
				this.speedManager.update(), e.prototype.update.call(this), this.hasEatenBalls && !this.isLost && 0 == this.ballManager.getAliveBallsCount() && 0 == this.ballManager.getFutureBallsCount() && this.lose()
			}, i.prototype.buildPathPoints = function(e, i, n) {
				var a = t.PathBuilder.generatePathPointsArray(e, i, n);
				if (this.pathPoints = [], a.length < 2) gradle.event("Path is too short!");
				else {
					var s = t.AdvancedMath.pointOnSegment(a[0][0], a[0][1], a[1][0], a[1][1], -t.Settings.BALL_DIAMETER);
					a.unshift([s.x, s.y]);
					var o = t.AdvancedMath.pointOnSegment(a[a.length - 1][0], a[a.length - 1][1], a[a.length - 2][0], a[a.length - 2][1], -1.2 * t.Settings.BALL_DIAMETER);
					a.push([o.x, o.y])
				}
				for (var r = 0; r < a.length; r++) {
					var l = new t.PathPoint(this, a[r][0], a[r][1], r, 5, 153);
					r > 0 && (this.pathPoints[this.pathPoints.length - 1].setNext(l), l.setPrev(this.pathPoints[this.pathPoints.length - 1])), this.pathPoints.push(l)
				}
			}, i.prototype.clearPathPoints = function() {
				this.pathPoints && this.pathPoints.forEach((function(t) {
					return t.destroy()
				})), this.pathPoints = []
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.speedManager.destroy(), this.speedManager = null, this.pathInitializer = null, this.pathFinalizer = null, this.pathManager = null, this.tunnelManager = null
			}, i
		}(Phaser.Group);
		t.Path = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game, null) || this;
				return i.startPosition = 0, i.bonusPoints = 0, i.path = t, i
			}
			return __extends(i, e), i.prototype.start = function() {
				for (var e = this.path.calculateRelativePosition(this.path.getTotalLength(), -2 * t.Settings.BALL_DIAMETER), i = (this.path.getConcretePosition(this.startPosition), this.path.calculateRelativePosition(this.startPosition, t.Settings.game.PATH_FINISHED_BONUS_STEP)), n = t.Settings.game.PATH_FINISHED_BONUS_DELAY; i < e && i >= 0;) {
					var a = this.path.getConcretePosition(i);
					t.StatsManager.instance.addBonus(1), t.ScoreManager.instance.displayScores(t.Settings.game.PATH_FINISHED_BONUS_SCORE, !0, t.BallFactory.getRandomColor(), a.x, a.y, n, !1, !1, Phaser.Math.random(.6, .8), !0), n += t.Settings.game.PATH_FINISHED_BONUS_DELAY, i = this.path.calculateRelativePosition(i, t.Settings.game.PATH_FINISHED_BONUS_STEP), this.bonusPoints++
				}
				this.game.time.events.add(n + 300, this.finishPath, this)
			}, i.prototype.setStartposition = function(t) {
				this.startPosition = t
			}, i.prototype.finishPath = function() {
				this.path.isFinished = !0, this.path.pathManager.finalizeNext(this.path)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.path = null
			}, i
		}(Phaser.Group);
		t.PathFinalizer = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t) {
				var i = e.call(this, t.game, null) || this;
				return i.path = t, i
			}
			return __extends(i, e), i.prototype.start = function() {
				for (var e = this, i = this.path.calculateRelativePosition(this.path.getTotalLength(), -t.Settings.BALL_DIAMETER), n = this.path.getConcretePosition(0), a = this.path.calculateRelativePosition(0, t.Settings.game.PATH_ARROW_STEP), s = this.path.totalLength / t.Settings.game.PATH_ARROW_DURATION, o = t.Settings.game.PATH_ARROW_BASE_DELAY; a < i && a >= 0;) {
					var r = this.path.getConcretePosition(a);
					if (this.path.isVisible(a)) {
						var l = Phaser.Math.angleBetween(n.x, n.y, r.x, r.y) + Math.PI / 2;
						this.add(new t.PathArrow(r.x, r.y, l, o))
					}
					o += t.Settings.game.PATH_ARROW_STEP / s, a = this.path.calculateRelativePosition(a, t.Settings.game.PATH_ARROW_STEP), n = r
				}
				this.game.time.events.add(t.Settings.game.PATH_ARROW_BASE_DELAY, (function() {
					return e.game.sound.play("path_initialization", .8)
				})), this.game.time.events.add(o + 250, this.activatePath, this)
			}, i.prototype.activatePath = function() {
				this.path.pathManager.initializeNext(this.path)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.path = null
			}, i
		}(Phaser.Group);
		t.PathInitializer = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e(e) {
				this.isRewindActive = !1, this.hasLightingPowerupActivated = !1, this.targetSpeed = t.Settings.game.CHAIN_START_SPEED, this.speed = t.Settings.game.CHAIN_START_SPEED, this.useExpotentialAcceleration = !0, this.rewindCountdown = 0, this.isStartingSpeedupActive = !0, this.isWarningPointReached = !1, this.hasActiveSlowdownPowerup = !1, this.hasBallsInTheQueue = !1, this.hasBallsOnThePath = !1, this.hasEatenBalls = !1, this.path = e, this.level = e.pathManager.level, this.ballManager = e.ballManager, this.rollingBallsSound = this.path.game.add.sound("rolling_balls", 1, !0)
			}
			return e.prototype.start = function() {
				this.rollingBallsSound.play()
			}, e.prototype.update = function() {
				this.checkConditions(), this.updateTargetSpeed(), this.updateChainSpeed(), t.Settings.ENABLE_DEBUG_OUTPUT && this.level.game.debug.text("" + Phaser.Math.roundTo(this.getChainSpeed(), -1), 580, 14, "#70f0ff")
			}, e.prototype.checkConditions = function() {
				var e = this.ballManager.getLastMovingBall(),
					i = e ? e.getAbsolutePosition() : -1;
				this.rewindCountdown -= t.Settings.REALTIME_CALCULATIONS ? this.level.game.time.elapsedMS : this.level.game.time.physicsElapsedMS, this.hasBallsInTheQueue = this.ballManager.ballFactory.ballsQueue.length > 0, this.hasBallsOnThePath = this.ballManager.getAliveBallsCount() > 0, this.hasEatenBalls = this.path.hasEatenBalls, this.isWarningPointReached = i > this.path.warningPosition, this.hasActiveSlowdownPowerup = this.level.powerupManager.hasAlivePowerups(t.PowerupType.SLOWDOWN), this.isRewindActive = !this.hasEatenBalls && this.isRewindActive && this.rewindCountdown > 0, this.isStartingSpeedupActive = this.isStartingSpeedupActive && i < this.path.totalLength * t.Settings.game.getChainQuickFillInPercentage(), this.isRewindActive && !this.hasBallsOnThePath && (this.isRewindActive = !1, this.speed = 0)
			}, e.prototype.updateTargetSpeed = function() {
				if (this.isWarningPointReached) this.targetSpeed = t.Settings.game.getBallSpeed() * t.Settings.game.SLOWDOWN_POINT_SPEED_MULTIPLIER;
				else if (this.isStartingSpeedupActive) {
					var e = this.ballManager.getLastMovingBall() ? this.ballManager.getLastMovingBall().getAbsolutePosition() : -1,
						i = this.path.totalLength * t.Settings.game.getChainQuickFillInPercentage();
					i - e < t.Settings.game.CHAIN_QUICK_FILL_IN_BREAKING_ABSOLUTE_DISTANCE ? this.speed = this.targetSpeed = t.Settings.game.getBallSpeed() + (i - e) / t.Settings.game.CHAIN_QUICK_FILL_IN_BREAKING_ABSOLUTE_DISTANCE * (t.Settings.game.CHAIN_START_SPEED - t.Settings.game.getBallSpeed()) : this.targetSpeed = t.Settings.game.CHAIN_START_SPEED
				} else this.targetSpeed = t.Settings.game.getBallSpeed();
				this.hasActiveSlowdownPowerup && (this.targetSpeed *= this.level.powerupManager.getAlivePowerup(t.PowerupType.SLOWDOWN).slowdownMultiplier), this.isRewindActive && (this.targetSpeed = t.Settings.game.REWIND_SPEED)
			}, e.prototype.updateChainSpeed = function() {
				if (this.hasEatenBalls) {
					var e = this.ballManager.balls.length + this.ballManager.ballFactory.ballsQueue.length;
					return this.speed = this.targetSpeed = t.Settings.game.CHAIN_LOSE_SPEED * (1 + t.Settings.game.CHAIN_LOSE_ACCELERATION_MULTIPLIER * (e / this.ballManager.ballFactory.totalBalls)), void(this.rollingBallsSound.volume = Phaser.Math.clamp(this.hasBallsOnThePath ? Math.abs(this.speed) / 850 : 0, 0, 1))
				}
				this.speed < this.targetSpeed ? (this.useExpotentialAcceleration && Phaser.Math.sign(this.speed) == Phaser.Math.sign(this.targetSpeed) ? this.speed *= t.Settings.game.PATH_EXPOTENTIAL_ACCELERATION : this.speed += t.Settings.game.PATH_ACCELERATION, this.speed > this.targetSpeed && (this.speed = this.targetSpeed, this.useExpotentialAcceleration = !1)) : this.speed > this.targetSpeed && (this.useExpotentialAcceleration && Phaser.Math.sign(this.speed) == Phaser.Math.sign(this.targetSpeed) ? this.speed /= t.Settings.game.PATH_EXPOTENTIAL_ACCELERATION : this.speed -= t.Settings.game.PATH_ACCELERATION, this.speed < this.targetSpeed && (this.speed = this.targetSpeed, this.useExpotentialAcceleration = !1)), this.rollingBallsSound.volume = Phaser.Math.clamp(this.hasBallsOnThePath ? Math.abs(this.speed) / 850 : 0, 0, 1)
			}, e.prototype.getChainSpeed = function() {
				return this.speed
			}, e.prototype.setChainSpeed = function(t, e) {
				void 0 === e && (e = !1), this.speed = t, this.useExpotentialAcceleration = e && !this.isRewindActive
			}, e.prototype.activateRewind = function() {
				this.isRewindActive = !0, this.useExpotentialAcceleration = !1, this.rewindCountdown = t.Settings.game.REWIND_POWERUP_DURATION
			}, e.prototype.pause = function() {
				this.rollingBallsSound.volume = 0
			}, e.prototype.resume = function() {}, e.prototype.destroy = function() {
				this.rollingBallsSound.stop(), this.rollingBallsSound.destroy(), this.rollingBallsSound = null, this.path = null, this.level = null, this.ballManager = null
			}, e
		}();
		t.PathSpeedManager = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends(i, e), i.generatePathPointsArray = function(e, i, n) {
				for (var a = [], s = [], o = 0; o < e.length; o++) s.push(e[o][0]), s.push(e[o][1]);
				var r = t.Settings.USE_NEW_PATH_GENERATOR ? (new t.CurveCalculator).getCurvePoints(s, i) : (new t.CurveCalculator).getCurvePointsClassic(s, i, n);
				for (o = 0; o < r.length; o += 2) a.push([r[o], r[o + 1]]);
				return a
			}, i
		}(Phaser.Group);
		t.PathBuilder = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				var a = e.call(this, t.App.instance, null) || this;
				return a.lifetime = t.Settings.game.POWERUP_LIFETIME, a.ball = i, a.ball.powerupType = n, a.powerupType = n, a.buildSprites(), a.buildAnimations(), a
			}
			return __extends(i, e), i.prototype.buildSprites = function() {
				this.lightSprite = this.add(this.game.make.sprite(0, 0, t.Settings.GAME_ATLAS, "powerupLight0000")), this.lightSprite.anchor.set(.5), this.iconSprite = this.add(this.game.make.sprite(2, 2, t.Settings.GAME_ATLAS, "powerupIcons000" + this.powerupType)), this.iconSprite.anchor.set(.5)
			}, i.prototype.buildAnimations = function() {
				var t = Phaser.Animation.generateFrameNames("powerupLight", 0, 22, "", 4);
				this.lightAnimation = this.lightSprite.animations.add("lightAnimation", t.concat(t.concat([]).reverse()), 60, !0), this.lightAnimation.play()
			}, i.prototype.activate = function(t) {
				t && t.activatePowerup(this.powerupType, this.ball)
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.lifetime -= this.game.time.elapsedMS, this.lifetime < 1e3 && this.lifetime > 0 && (this.alpha = this.lifetime / 1e3), this.lifetime < 0 && this.ball.removePowerup()
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.ball = null
			}, i
		}(Phaser.Group);
		t.PowerupActivator = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function t() {}
			return t.timer = function() {
				return 0
			}, t.combo = function(t) {
				var e = 5;
				switch (t) {
					case 2:
						e = 5;
						break;
					case 3:
						e = 6;
						break;
					case 4:
						e = 7;
						break;
					case 5:
						e = 8;
						break;
					case 6:
						e = 9
				}
				return e
			}, t.gapBonus = function(t) {
				var e = 1;
				switch (t) {
					case 1:
						e = 1;
						break;
					case 2:
						e = 2;
						break;
					case 3:
						e = 3;
						break;
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
						e = 4
				}
				return e
			}, t
		}();
		t.PowerupEventType = e
	}(src || (src = {})),
	function(t) {
		! function(t) {
			t[t.SLOWDOWN = 0] = "SLOWDOWN", t[t.REWIND = 1] = "REWIND", t[t.BOMB = 2] = "BOMB", t[t.LIGHTING = 3] = "LIGHTING", t[t.LASER = 4] = "LASER", t[t.FIREBALL = 5] = "FIREBALL"
		}(t.PowerupType || (t.PowerupType = {}))
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a, s, o) {
				var r = e.call(this, t.App.instance, null) || this;
				return r.duration = 0, r.isContinuous = !1, r.isDead = !1, r.isActive = !0, r.powerupManager = i, r.level = i.level, r.targetBall = o, r.powerupType = n, r.isContinuous = a, r.startingDuration = s, r.activate(), r
			}
			return __extends(i, e), i.prototype.activate = function() {
				this.duration = this.startingDuration, this.isActive = !0
			}, i.prototype.refresh = function(t) {
				this.targetBall = t, this.duration = this.startingDuration, this.isActive = !0
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.duration -= this.game.time.elapsedMS, this.duration <= 0 && this.killPowerup()
			}, i.prototype.killPowerup = function() {
				this.isDead = !0, this.isActive = !1, this.powerupManager.powerUps.indexOf(this) > -1 && this.powerupManager.powerUps.splice(this.powerupManager.powerUps.indexOf(this), 1), this.destroy()
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.powerupManager = null, this.level = null, this.targetBall = null
			}, i
		}(Phaser.Group);
		t.Powerup = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				return e.call(this, i, t.PowerupType.BOMB, !1, 0, n) || this
			}
			return __extends(i, e), i.prototype.activate = function() {
				e.prototype.activate.call(this), this.destroyBallsAround(this.targetBall.x, this.targetBall.y), this.targetBall && this.targetBall.visible && (this.level.effectsManager.addBombExplosion(this.targetBall.x, this.targetBall.y), this.game.sound.play("bomb_explosion", .8), this.game.camera.shake(.006, 350))
			}, i.prototype.destroyBallsAround = function(e, i) {
				for (var n = 0, a = 0, s = this.level.pathManager.paths; a < s.length; a++)
					for (var o = 0, r = s[a].ballManager.balls; o < r.length; o++) {
						var l = r[o];
						if (l && l.isAlive && Phaser.Math.distance(e, i, l.x, l.y) <= t.Settings.game.BOMB_EXPLOSION_RADIUS) {
							var h = l.path == this.targetBall.path;
							h = h && (l.path.calculateRelativePosition(l.getRelativePosition(), t.Settings.game.BOMB_EXPLOSION_RADIUS) >= this.targetBall.getRelativePosition() || l.path.calculateRelativePosition(l.getRelativePosition(), -t.Settings.game.BOMB_EXPLOSION_RADIUS) <= this.targetBall.getRelativePosition()), (l.visible || h) && (n++, this.game.time.events.add(t.Settings.game.BOMB_EXPLOSION_DELAY, (function(e) {
								t.ScoreManager.instance.displayScores(t.ScoreManager.instance.calculateScores(1), !0, e.color, e.x, e.y, Phaser.Math.random(5, 200), !0, !0), e.explodeBall()
							}), this, l))
						}
					}
				n > 0 && this.targetBall.ballManager.propagateImpulse(this.targetBall, 700)
			}, i
		}(t.Powerup);
		t.BombPowerup = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				return e.call(this, i, t.PowerupType.FIREBALL, !1, 0, n) || this
			}
			return __extends(i, e), i.prototype.activate = function() {
				e.prototype.activate.call(this), this.level.cannonManager.cannon.activateFireBall()
			}, i
		}(t.Powerup);
		t.FireballPowerup = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				var a = e.call(this, i, t.PowerupType.LASER, !0, t.Settings.game.LASER_POWERUP_DURATION, n) || this;
				return a.laserEffect = a.powerupManager.level.cannonManager.addAt(new t.LaserEffect, 0), a.laserHighlight = a.add(a.game.make.sprite(-100, -100, t.Settings.GAME_ATLAS, "laserHighlight0000")), a.laserHighlight.anchor.set(.5), a.laserHighlight.visible = !1, a
			}
			return __extends(i, e), i.prototype.activate = function() {
				e.prototype.activate.call(this), this.game.sound.play("lazer", .4)
			}, i.prototype.postUpdate = function() {
				e.prototype.postUpdate.call(this), this.isDead || (this.position.copyFrom(new Phaser.Point(this.powerupManager.level.cannonManager.cannon.x, this.powerupManager.level.cannonManager.cannon.y - 68).rotate(this.powerupManager.level.cannonManager.cannon.x, this.powerupManager.level.cannonManager.cannon.y, this.powerupManager.level.cannonManager.cannon.rotation)), this.laserEffect.position.copyFrom(this.position), this.laserEffect.rotation = this.powerupManager.level.cannonManager.cannon.rotation, this.updateSprites(), this.duration < 1500 ? this.alpha = this.duration < 750 && Math.random() > .6 ? 0 : this.duration / 1500 : this.alpha = 1)
			}, i.prototype.updateSprites = function() {
				for (var e = null, i = Number.MAX_VALUE, n = new Phaser.Point(this.x, this.y - 1e3).rotate(this.x, this.y, this.laserEffect.rotation, !1), a = 0, s = this.powerupManager.level.pathManager.paths; a < s.length; a++)
					for (var o = 0, r = s[a].ballManager.balls; o < r.length; o++) {
						var l = r[o];
						if (l && l.isAlive && !l.isUnderground) {
							var h = t.AdvancedMath.findLineCircleIntersections(l.x, l.y, t.Settings.BALL_DIAMETER / 2, this.x, this.y, n.x, n.y, !0);
							if (h) {
								var c = Phaser.Math.distance(this.x, this.y, h.x, h.y);
								c < i && (i = c, e = l)
							}
						}
					}
				e ? (this.laserEffect.setLength(i), this.laserHighlight.visible = !0, this.laserHighlight.position.set(e.x - this.x, e.y - this.y)) : (this.laserEffect.setLength(-1), this.laserHighlight.visible = !1)
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.laserEffect.destroy(), this.laserEffect = null, this.laserHighlight.destroy(), this.laserHighlight = null
			}, i
		}(t.Powerup);
		t.LaserPowerup = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				return e.call(this, i, t.PowerupType.LIGHTING, !0, 1e3, n) || this
			}
			return __extends(i, e), i.prototype.activate = function() {
				var i = this;
				e.prototype.activate.call(this);
				for (var n = 0, a = Phaser.ArrayUtils.shuffle(this.getSuitableBalls()), s = [this.targetBall]; s;)
					for (var o = 0, r = s; o < r.length; o++) {
						var l = r[o],
							h = this.getBallsPortion(a);
						if (h) {
							for (var c = 0, u = h; c < u.length; c++) {
								var p = u[c];
								this.add(new t.Lighting(l, p).setDelay(n))
							}
							n += t.Lighting.TOTAL_FRAMES / t.Lighting.FPS * 1e3 + t.Settings.game.LIGHTING_DELAY_BETWEEN_STRIKES
						}
						s = h
					}
				this.game.time.events.add(n, (function() {
					return i.explodeInvisibleBalls()
				}))
			}, i.prototype.refresh = function(t) {
				e.prototype.refresh.call(this, t), this.activate()
			}, i.prototype.update = function() {
				if (e.prototype.update.call(this), this.duration = this.children.length > 0 ? 1e4 : this.duration > t.Settings.LIGHTING_STRIKE_COLLAPSE_DELAY ? t.Settings.LIGHTING_STRIKE_COLLAPSE_DELAY : this.duration, 0 == this.children.length && this.duration == t.Settings.LIGHTING_STRIKE_COLLAPSE_DELAY)
					for (var i = 0, n = this.powerupManager.level.pathManager.paths; i < n.length; i++) n[i].speedManager.hasLightingPowerupActivated = !0
			}, i.prototype.getSuitableBalls = function() {
				for (var t = [], e = 0, i = this.powerupManager.level.pathManager.paths; e < i.length; e++)
					for (var n = 0, a = i[e].ballManager.balls; n < a.length; n++) {
						var s = a[n];
						s && s.isAlive && s.visible && s != this.targetBall && s.color == this.targetBall.color && t.push(s)
					}
				return t
			}, i.prototype.getBallsPortion = function(e) {
				if (0 == e.length) return null;
				if (e.length < t.Settings.game.LIGHTING_MIN_TARGETS) return e.splice(0, e.length);
				var i = t.Settings.game.LIGHTING_MIN_TARGETS + Math.floor(Math.random() * (t.Settings.game.LIGHTING_MAX_TARGETS + 1 - t.Settings.game.LIGHTING_MIN_TARGETS));
				return e.splice(0, i > e.length ? e.length : i)
			}, i.prototype.explodeInvisibleBalls = function() {
				for (var e = 0, i = this.powerupManager.level.pathManager.paths; e < i.length; e++)
					for (var n = 0, a = i[e].ballManager.balls; n < a.length; n++) {
						var s = a[n];
						s && s.isAlive && !s.visible && s != this.targetBall && s.color == this.targetBall.color && (t.ScoreManager.instance.displayScores(t.ScoreManager.instance.calculateScores(1), !1, s.color, s.x, s.y, Phaser.Math.random(5, 150), !0, !0), s.explodeBall())
					}
			}, i
		}(t.Powerup);
		t.LightingPowerup = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				return e.call(this, i, t.PowerupType.REWIND, !1, t.Settings.game.REWIND_POWERUP_DURATION, n) || this
			}
			return __extends(i, e), i.prototype.activate = function() {
				e.prototype.activate.call(this);
				for (var t = 0, i = this.powerupManager.level.pathManager.paths; t < i.length; t++) {
					var n = i[t];
					this.game.sound.play("rewind", .7), n.speedManager.activateRewind()
				}
			}, i
		}(t.Powerup);
		t.RewindPowerup = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n) {
				var a = e.call(this, i, t.PowerupType.SLOWDOWN, !0, t.Settings.game.SLOWDOWN_POWERUP_DURATION, n) || this;
				return a.isFrozen = !1, a.isMelted = !1, a.countdown = 0, a.slowdownMultiplier = 1, a.countdown = a.startingDuration, a
			}
			return __extends(i, e), i.prototype.activate = function() {
				e.prototype.activate.call(this), this.isActive = !1, this.slowdownMultiplier = 1, this.freezeEffect = this.add(new t.FreezeEffect(this)), this.freezeEffect.freeze()
			}, i.prototype.refresh = function(t) {
				e.prototype.refresh.call(this, t), this.countdown = this.startingDuration, this.isActive = !1, this.isFrozen = !1, this.isMelted = !1, this.slowdownMultiplier = 1, this.freezeEffect.freeze()
			}, i.prototype.onFrozen = function() {
				this.isFrozen = !0
			}, i.prototype.onMelted = function() {
				this.isMelted = !0, this.duration = 0
			}, i.prototype.update = function() {
				e.prototype.update.call(this), this.isDead || (this.duration = this.startingDuration, this.isMelted ? this.killPowerup() : this.isFrozen && !this.isMelted && (this.countdown -= this.game.time.elapsedMS, this.countdown <= 0 && (this.isActive = !0, this.freezeEffect.melt(), this.countdown = Number.MAX_VALUE)))
			}, i
		}(t.Powerup);
		t.SlowdownPowerup = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a, s, o, r) {
				var l = e.call(this, t.App.instance, null) || this;
				return l.tunnelManager = i, l.path = n, l.startPoint = n.pathPoints[a], l.endPoint = n.pathPoints[o], l.startPosition = a, l.endPosition = o, l.entrancePosition = l.path.calculateRelativePosition(a, -60), l.entrancePosition = l.entrancePosition < 0 ? a : l.entrancePosition, l.exitPosition = l.path.calculateRelativePosition(o, 45), l.exitPosition = l.exitPosition < 0 ? o : l.exitPosition, l.entranceBottom = l.tunnelManager.level.backgroundManager.add(new t.TunnelBottom(l.startPoint.x, l.startPoint.y, s)), l.entranceTop = l.add(new t.TunnelTop(l.startPoint.x, l.startPoint.y, s)), l.exitBottom = l.tunnelManager.level.backgroundManager.add(new t.TunnelBottom(l.endPoint.x, l.endPoint.y, r)), l.exitTop = l.add(new t.TunnelTop(l.endPoint.x, l.endPoint.y, r)), l
			}
			return __extends(i, e), i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.tunnelManager = null, this.path = null, this.startPoint = null, this.endPoint = null, this.entranceTop = null, this.entranceBottom = null, this.exitTop = null, this.exitBottom = null
			}, i
		}(Phaser.Group);
		t.Tunnel = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a) {
				var s = e.call(this, t.App.instance, i, n, t.Settings.GAME_ATLAS, "tunnelBot0000") || this;
				return s.anchor.set(.5, -.3), s.rotation = a, s
			}
			return __extends(i, e), i
		}(Phaser.Sprite);
		t.TunnelBottom = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a) {
				var s = e.call(this, t.App.instance, i, n, t.Settings.GAME_ATLAS, "tunnelTop0000") || this;
				return s.anchor.set(.5, .35), s.rotation = a, s
			}
			return __extends(i, e), i
		}(Phaser.Sprite);
		t.TunnelTop = e
	}(src || (src = {})),
	function(t) {
		var e, i = function() {
			function i() {
				this.soundInstances = {}, this.swapSoundIndex = 1, this.defaultMusicVolume = .3, this.chokedMusicVolume = .1, this.defaultMusicVolume = t.App.instance.device.desktop ? .3 : .25, this.menuTheme = t.App.instance.add.sound("themeA", this.defaultMusicVolume, !0), this.gameplayThemeA = t.App.instance.add.sound("themeB", this.defaultMusicVolume, !1), this.gameplayThemeB = t.App.instance.add.sound("themeC", this.defaultMusicVolume, !1)
			}
			return Object.defineProperty(i, "instance", {
				get: function() {
					return i._instance ? i._instance : i._instance = new i
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.isDecodingSupported = function() {
				return t.App.instance.sound.usingWebAudio
			}, i.prototype.switchToMenuMusic = function() {
				this.mode != e.MENU_MUSIC && (this.mode = e.MENU_MUSIC, this.removeListeners(), this.stopMusic(), this.currentTheme = this.menuTheme.play("", 0, 0), this.currentTheme.fadeTo(1500, this.defaultMusicVolume))
			}, i.prototype.switchToInGameMusic = function() {
				this.mode != e.GAMEPLAY_MUSIC && (this.stopMusic(), this.mode = e.GAMEPLAY_MUSIC, this.addListeners(), this.currentTheme = Math.random() > .5 ? this.gameplayThemeA.play("", 0, 0) : this.gameplayThemeB.play("", 0, 0), this.currentTheme.fadeTo(1200, this.defaultMusicVolume))
			}, i.prototype.stopMusic = function() {
				this.menuTheme.isPlaying && this.menuTheme.stop(), this.gameplayThemeA.isPlaying && this.gameplayThemeA.stop(), this.gameplayThemeB.isPlaying && this.gameplayThemeB.stop()
			}, i.prototype.switchGameplayTheme = function() {
				this.mode == e.GAMEPLAY_MUSIC && (this.currentTheme == this.gameplayThemeA ? this.currentTheme = this.gameplayThemeB.play() : this.currentTheme == this.gameplayThemeB && (this.currentTheme = this.gameplayThemeA.play()))
			}, i.prototype.addListeners = function() {
				var t = this;
				this.gameplayThemeA.onStop.add((function() {
					t.switchGameplayTheme()
				})), this.gameplayThemeB.onStop.add((function() {
					t.switchGameplayTheme()
				}))
			}, i.prototype.removeListeners = function() {
				this.gameplayThemeA.onStop.removeAll(), this.gameplayThemeB.onStop.removeAll()
			}, i.prototype.playSwapSound = function() {
				t.App.instance.sound.play("ball_swap0" + (this.swapSoundIndex++ % 2 + 1), .7)
			}, i.prototype.chokeMusicVolume = function(t) {
				void 0 === t && (t = 500), this.currentTheme && this.currentTheme.fadeTo(t, this.chokedMusicVolume)
			}, i.prototype.restoreMusicVolume = function(t) {
				void 0 === t && (t = 500), this.currentTheme && this.currentTheme.fadeTo(t, this.defaultMusicVolume)
			}, i._instance = null, i
		}();
		t.SoundController = i,
			function(t) {
				t[t.MENU_MUSIC = 0] = "MENU_MUSIC", t[t.GAMEPLAY_MUSIC = 1] = "GAMEPLAY_MUSIC"
			}(e = t.MusicMode || (t.MusicMode = {}))
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends(i, e), i.prototype.init = function(i, n) {
				void 0 === i && (i = t.CustomScaleManager.ORIGINAL_WIDTH), void 0 === n && (n = t.CustomScaleManager.ORIGINAL_HEIGHT), e.prototype.init.call(this), this.containerWidth = i, this.containerHeight = n, this.container = this.add.existing(this.game.make.group(null)), this.resize()
			}, i.prototype.addChild = function(t) {
				return this.container.add(t)
			}, i.prototype.getInputPosition = function() {
				return new Phaser.Point((this.game.input.activePointer.x - this.container.x) / t.CustomScaleManager.SCALE_X, (this.game.input.activePointer.y - this.container.y) / t.CustomScaleManager.SCALE_Y)
			}, i.prototype.resize = function(e, i) {
				void 0 === e && (e = 0), void 0 === i && (i = 0), this.container.scale.set(t.CustomScaleManager.SCALE_X, t.CustomScaleManager.SCALE_Y), this.container.position.set(t.CustomScaleManager.WIDTH / 2 - this.containerWidth * t.CustomScaleManager.SCALE_X / 2, t.CustomScaleManager.HEIGHT / 2 - this.containerHeight * t.CustomScaleManager.SCALE_Y / 2)
			}, i.prototype.shutdown = function() {
				this.container.destroy(), this.container = null
			}, i
		}(Phaser.State);
		t.AutoResizeableState = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends(i, e), i.prototype.init = function() {
				this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE, this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE, this.game.scale.pageAlignHorizontally = !0, this.game.scale.pageAlignVertically = !0, this.game.device.android && (this.game.input.mouse.enabled = !this.game.device.mspointer), this.game.scale.setResizeCallback(this.resizeCallback, this), this.game.scale.onSizeChange.add(this.sizeChanged, this)
			}, i.prototype.preload = function() {
				this.game.load.atlas(t.Settings.PRELOADER_ATLAS, "img/" + t.Settings.PRELOADER_ATLAS + ".png", "img/" + t.Settings.PRELOADER_ATLAS + ".json")
			}, i.prototype.create = function() {
				this.input.maxPointers = 1, this.stage.disableVisibilityChange = !0, this.game.device.desktop && (this.game.canvas.oncontextmenu = function(t) {
					t.preventDefault()
				}), this.game.state.start("Preloader", !0, !1)
			}, i.prototype.resizeCallback = function(t, e) {}, i.prototype.sizeChanged = function(e, i, n) {
				t.CustomScaleManager.update(i, n)
			}, i
		}(Phaser.State);
		t.Boot = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends(i, e), i.prototype.create = function() {
				var e = this;
				this.maskGraphics = this.addChild(this.game.make.graphics(0, 0)), this.maskGraphics.beginFill(0, 1).drawRect(0, 0, t.CustomScaleManager.ORIGINAL_WIDTH, t.CustomScaleManager.ORIGINAL_HEIGHT).endFill(), this.maskedContainer = this.addChild(this.game.make.group(null)), this.gameStateManager = this.maskedContainer.add(new t.GameStateManager(this)), this.backgroundManager = this.maskedContainer.add(new t.BackgroundManager(this)), this.touchInputManager = this.maskedContainer.add(new t.TouchInputManager(this)), this.wayManager = this.maskedContainer.add(new t.WayManager(this)), this.pathManager = this.maskedContainer.add(new t.PathManager(this)), this.daemonManager = this.maskedContainer.add(new t.DaemonManager(this)), this.coinManager = this.maskedContainer.add(new t.CoinManager(this)), this.cannonManager = this.maskedContainer.add(new t.CannonManager(this)), this.powerupManager = this.maskedContainer.add(new t.PowerupManager(this)), this.foregroundManager = this.addChild(new t.ForegroundManager(this)), this.uiManager = this.addChild(new t.UIManager(this)), this.effectsManager = this.addChild(new t.EffectsManager(this)), this.maskedContainer.mask = this.maskGraphics, t.Settings.MUSIC_ENABLED_BY_DEFAULT && (t.SoundController.instance.restoreMusicVolume(), t.SoundController.instance.switchToInGameMusic()), t.StatsManager.instance.clear(), t.ScoreManager.instance.clear(), this.pathManager.buildPaths(), this.daemonManager.buildDaaemons(), this.wayManager.buildTexture(), this.coinManager.buildCoins(), this.cannonManager.buildAll(), t.TutorialManager.instance.dispatchLevelStart((function() {
					return e.gameStateManager.startInitialization()
				})), t.WindowManager.instance.endTransition(), gradle.event("SCREEN_LEVEL"), gradle.event("EVENT_LEVELSTART", {
					levelName: "" + t.Settings.CURRENT_LEVEL
				})
			}, i.prototype.update = function() {
				this.gameStateManager.isStarted && !this.gameStateManager.isPaused && (t.StatsManager.instance.update(), t.ScoreManager.instance.update())
			}, i.prototype.shutdown = function() {
				this.gameStateManager.destroy(), this.gameStateManager = null, this.backgroundManager.destroy(), this.backgroundManager = null, this.touchInputManager.destroy(), this.touchInputManager = null, this.pathManager.destroy(), this.pathManager = null, this.daemonManager.destroy(), this.daemonManager = null, this.wayManager.destroy(), this.wayManager = null, this.coinManager.destroy(), this.coinManager = null, this.cannonManager.destroy(), this.cannonManager = null, this.effectsManager.destroy(), this.effectsManager = null, this.powerupManager.destroy(), this.powerupManager = null, this.foregroundManager.destroy(), this.foregroundManager = null, this.uiManager.destroy(), this.uiManager = null
			}, i
		}(t.AutoResizeableState);
		t.Level = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				var t = null !== e && e.apply(this, arguments) || this;
				return t.digitContainerRadius = 444, t.angleBetweenDigits = Math.PI / 6, t._currentLevelIndex = 0, t.angularSpeed = 0, t.currentStep = 1, t.isSpinning = !1, t.isPlayButtonEnabled = !0, t.isWheelPressed = !1, t.dragDeltaAngle = 0, t
			}
			return __extends(i, e), i.prototype.create = function() {
				this.wheelSoundLastTimestamp = this.game.time.now, this.buildContent(), this.updateSoundButtons(), t.TutorialManager.instance.dispatchLevelsMapOpening(), t.WindowManager.instance.endTransition(), gradle.event("SCREEN_LEVELSELECT")
			}, i.prototype.buildContent = function() {
				this.maskGraphics = this.addChild(this.game.make.graphics(0, -t.CustomScaleManager.ORIGINAL_WIDTH / 2)), this.maskGraphics.beginFill(0, 1).drawRect(0, 0, t.CustomScaleManager.ORIGINAL_WIDTH, 3 * t.CustomScaleManager.ORIGINAL_WIDTH).endFill(), this.container.mask = this.maskGraphics, this.responsiveContainer = this.addChild(this.game.make.group(null)), this.circleBackgroundLeft = this.responsiveContainer.add(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2 - 224, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 - 142, t.Settings.UI_ATLAS, "digitContainerBackground0000")), this.circleBackgroundLeft.anchor.set(.5, .5), this.circleBackgroundCenter = this.responsiveContainer.add(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2 - 3, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 - 207, t.Settings.UI_ATLAS, "digitContainerBackground0000")), this.circleBackgroundCenter.anchor.set(.5, .5), this.circleBackgroundRight = this.responsiveContainer.add(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2 + 220, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 - 142, t.Settings.UI_ATLAS, "digitContainerBackground0000")), this.circleBackgroundRight.anchor.set(.5, .5), this.digitContainer = this.responsiveContainer.add(this.game.make.group(null)), this.digitContainer.position.set(t.CustomScaleManager.ORIGINAL_WIDTH / 2 - 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 236), this.levelsImage = this.responsiveContainer.add(this.game.make.image(t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT, "levels")), this.levelsImage.anchor.set(.5, 1), this.arrow = this.responsiveContainer.add(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 - 380, t.Settings.UI_ATLAS, "levelsArrow0000")), this.arrow.anchor.set(.5, 0), this.wheel = this.responsiveContainer.add(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2 - 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 184, t.Settings.UI_ATLAS, "levelsWheel0000")), this.wheel.anchor.set(.5, .5), this.buttonHome = this.addChild(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonHomeLevels", t.CustomScaleManager.ORIGINAL_WIDTH / 2 + 240, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 - 400, this.menuClicked, this)), this.buttonHome.anchor.set(.5), this.playButton = this.responsiveContainer.add(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 185, t.Settings.UI_ATLAS, "levelsPlayButton0000")), this.playButton.inputEnabled = !0, this.playButton.input.useHandCursor = !0, this.playButton.input.pixelPerfectClick = !0, this.playButton.events.onInputDown.add(this.onPlayButtonDown, this), this.playButton.events.onInputUp.add(this.onPlayButtonUp, this), this.playButton.anchor.set(.5), this.buildLevelNumbers(), this.resize(0, 0)
			}, i.prototype.buildLevelNumbers = function() {
				for (var e = 1; e <= t.Settings.TOTAL_LEVELS; e++) this.digitContainer.add(new t.LevelIndicator(e, e > t.Settings.LAST_UNLOCKED_LEVEL && !gradle.unlock_all_levels));
				this.currentLevelIndex = t.Settings.CURRENT_LEVEL < 1 ? 1 : t.Settings.LAST_UNLOCKED_LEVEL > t.Settings.TOTAL_LEVELS ? t.Settings.TOTAL_LEVELS : t.Settings.LAST_UNLOCKED_LEVEL, this.wheel.rotation = 2 * (t.Settings.LAST_UNLOCKED_LEVEL - 1) * Math.PI / t.Settings.LEVELS_WHEEL_AMPLIFIER, this.updateWheel(0), i.firstTimeSpinned ? this.addListeners() : (this.playButton.alpha = 0, i.firstTimeSpinned = !0, this.angularSpeed = 0, this.currentStep = 18, this.isSpinning = !0)
			}, i.prototype.update = function() {
				e.prototype.update.call(this, this.game), this.isSpinning ? (this.angularSpeed = 3.15 * (1 / Math.sqrt(this.currentStep) - .0577), this.currentStep += 1, this.angularSpeed < 0 ? (this.isSpinning = !1, this.addListeners(), this.finalizeWheelRotation()) : this.updateWheel(this.angularSpeed, 1)) : this.isWheelPressed && (this.updateWheel(this.getDeltaAngle(this.wheel.rotation, Phaser.Math.angleBetween(this.wheel.x, this.wheel.y, this.getInputPosition().x - this.responsiveContainer.x, this.getInputPosition().y - this.responsiveContainer.y) + Math.PI / 2 - this.dragDeltaAngle)), this.isPlayButtonEnabled && Phaser.Math.distance(this.playButton.x, this.playButton.y, this.getInputPosition().x - this.responsiveContainer.x, this.getInputPosition().y - this.responsiveContainer.y) > this.playButton.width / 2 && this.hidePlayButton())
			}, i.prototype.resize = function(i, n) {
				e.prototype.resize.call(this, i, n), this.responsiveContainer && (this.buttonHome.y = 80 - (Math.min(t.CustomScaleManager.HEIGHT / t.CustomScaleManager.SCALE_Y, 2 * t.CustomScaleManager.ORIGINAL_WIDTH) - t.CustomScaleManager.ORIGINAL_HEIGHT) / 2, this.responsiveContainer.y = (Math.min(t.CustomScaleManager.HEIGHT / t.CustomScaleManager.SCALE_Y, 2 * t.CustomScaleManager.ORIGINAL_WIDTH) - t.CustomScaleManager.ORIGINAL_HEIGHT) / 2)
			}, i.prototype.easeIn = function(t, e) {
				return Math.pow(t, e)
			}, i.prototype.getNormalizedLevelIndex = function(e) {
				return (e >= 0 ? e % t.Settings.TOTAL_LEVELS : t.Settings.TOTAL_LEVELS + e % t.Settings.TOTAL_LEVELS) % t.Settings.TOTAL_LEVELS
			}, i.prototype.getDeltaAngle = function(t, e) {
				var i = Phaser.Math.normalizeAngle(t),
					n = Phaser.Math.normalizeAngle(e);
				return Math.abs(n - i) > Math.PI && (i < n ? i += 2 * Math.PI : n += 2 * Math.PI), n - i
			}, i.prototype.updateVisibleNumbers = function() {
				this.digitContainer.children.forEach((function(t) {
					return t.visible = !1
				})), this.showAt(this.getDigit(this.currentLevelIndex, -1), -1), this.showAt(this.getDigit(this.currentLevelIndex, 0), 0), this.showAt(this.getDigit(this.currentLevelIndex, 1), 1)
			}, i.prototype.getDigit = function(e, i) {
				var n = (e + i) % t.Settings.TOTAL_LEVELS <= 0 ? t.Settings.TOTAL_LEVELS : (e + i) % t.Settings.TOTAL_LEVELS;
				return this.digitContainer.getChildAt(n - 1)
			}, i.prototype.showAt = function(t, e) {
				t.visible = !0;
				var i = new Phaser.Point(0, -this.digitContainerRadius);
				i.rotate(0, 0, e * this.angleBetweenDigits, !1), t.position.copyFrom(i), t.rotation = e * this.angleBetweenDigits
			}, i.prototype.updateWheel = function(e, i) {
				void 0 === i && (i = t.Settings.LEVELS_WHEEL_EASING_POWER), this.wheel.rotation += e;
				var n = -this.wheel.rotation * this.angleBetweenDigits / (2 * Math.PI) * t.Settings.LEVELS_WHEEL_AMPLIFIER;
				this.currentLevelIndex = this.getNormalizedLevelIndex(-Math.floor(n / this.angleBetweenDigits + .5)) + 1;
				for (var a = n / this.angleBetweenDigits; a < .5 - t.Settings.TOTAL_LEVELS;) a += t.Settings.TOTAL_LEVELS;
				for (; a > .5;) a -= t.Settings.TOTAL_LEVELS;
				var s = Math.abs(a) + 1 - this.currentLevelIndex;
				a > 0 && (s = -s % .5), this.updateVisibleNumbers(), this.digitContainer.rotation = s > 0 ? -this.angleBetweenDigits / 2 * this.easeIn(2 * Math.abs(s), i) : this.angleBetweenDigits / 2 * this.easeIn(2 * Math.abs(s), i)
			}, i.prototype.finalizeWheelRotation = function() {
				var e = this,
					i = this.wheel.rotation % (2 * Math.PI / t.Settings.LEVELS_WHEEL_AMPLIFIER);
				0 != i ? (i = Math.abs(i) > Math.PI / t.Settings.LEVELS_WHEEL_AMPLIFIER ? 2 * Phaser.Math.sign(i) * Math.PI / t.Settings.LEVELS_WHEEL_AMPLIFIER - i : -i, this.game.add.tween(this.wheel).to({
					rotation: this.wheel.rotation + i
				}, 400 * Math.abs(i) / (Math.PI / t.Settings.LEVELS_WHEEL_AMPLIFIER), Phaser.Easing.Quadratic.Out, !0).onUpdateCallback((function() {
					return e.updateWheel(0)
				})).onComplete.add((function() {
					e.updateWheel(0), e.showPlayButton()
				}))) : this.showPlayButton()
			}, i.prototype.showPlayButton = function() {
				(this.currentLevelIndex <= t.Settings.LAST_UNLOCKED_LEVEL || gradle.unlock_all_levels) && (this.isPlayButtonEnabled = !0, this.game.tweens.removeFrom(this.playButton), this.game.tweens.removeFrom(this.playButton.scale), this.playButton.visible = !0, this.game.add.tween(this.playButton).to({
					alpha: 1
				}, 170, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this.playButton.scale).to({
					x: 1,
					y: 1
				}, 170, Phaser.Easing.Cubic.Out, !0))
			}, i.prototype.hidePlayButton = function() {
				var t = this;
				this.isPlayButtonEnabled = !1, this.game.tweens.removeFrom(this.playButton), this.game.tweens.removeFrom(this.playButton.scale), this.game.add.tween(this.playButton).to({
					alpha: 0
				}, 150, Phaser.Easing.Cubic.In, !0).onComplete.add((function() {
					t.playButton.visible = !1
				})), this.game.add.tween(this.playButton.scale).to({
					x: .8,
					y: .8
				}, 150, Phaser.Easing.Cubic.In, !0)
			}, i.prototype.animateArrow = function(e, i) {
				var n = this,
					a = Math.abs(e - i) >= t.Settings.TOTAL_LEVELS - 1 ? e < i ? -1 : 1 : e < i ? 1 : -1;
				this.game.add.tween(this.arrow).to({
					rotation: a * t.Settings.LEVELS_ARROW_ANGLE
				}, 75, Phaser.Easing.Linear.None, !0, 0).onComplete.add((function() {
					return n.game.add.tween(n.arrow).to({
						rotation: 0
					}, 75, Phaser.Easing.Linear.None, !0, 0)
				}))
			}, i.prototype.addListeners = function() {
				this.wheel.inputEnabled = !0, this.wheel.events.onInputDown.add(this.handleWheelInputDown, this), this.game.input.onUp.add(this.handleInputUp, this)
			}, i.prototype.onPlayButtonDown = function() {
				this.playButton.frameName = "levelsPlayButton0001", this.handleWheelInputDown()
			}, i.prototype.onPlayButtonUp = function() {
				this.playButton.frameName = "levelsPlayButton0000", this.isPlayButtonEnabled && 1 == this.playButton.alpha && Phaser.Math.distance(this.playButton.x, this.playButton.y, this.getInputPosition().x - this.responsiveContainer.x, this.getInputPosition().y - this.responsiveContainer.y) < this.playButton.width / 2 ? this.onStartLevelPressed() : this.handleInputUp()
			}, i.prototype.handleWheelInputDown = function() {
				this.game.tweens.removeFrom(this.wheel), this.isWheelPressed = !0, this.dragDeltaAngle = this.getDeltaAngle(this.wheel.rotation, Phaser.Math.angleBetween(this.wheel.x, this.wheel.y, this.getInputPosition().x - this.responsiveContainer.x, this.getInputPosition().y - this.responsiveContainer.y) + Math.PI / 2)
			}, i.prototype.handleInputUp = function() {
				this.isWheelPressed && (this.isWheelPressed = !1, this.finalizeWheelRotation(), this.showPlayButton())
			}, i.prototype.onStartLevelPressed = function() {
				(this.currentLevelIndex <= t.Settings.LAST_UNLOCKED_LEVEL || gradle.unlock_all_levels) && (this.game.sound.play("click", .9), t.Settings.CURRENT_LEVEL = this.currentLevelIndex > t.Settings.TOTAL_LEVELS ? t.Settings.TOTAL_LEVELS : this.currentLevelIndex < 1 ? 1 : this.currentLevelIndex, t.LevelManager.instance.cachedLevel = t.LevelStorage.instance.getLevel(t.Settings.CURRENT_LEVEL), t.WindowManager.instance.transitionTo("Level"))
			}, i.prototype.menuClicked = function() {
				this.game.sound.play("click", .9), t.WindowManager.instance.transitionTo("MainMenu")
			}, i.prototype.soundOnClicked = function() {
				this.game.sound.mute = !0, this.updateSoundButtons(), this.game.sound.play("click", .9)
			}, i.prototype.soundOffClicked = function() {
				this.game.sound.mute = !1, this.updateSoundButtons(), this.game.sound.play("click", .9)
			}, i.prototype.updateSoundButtons = function() {}, Object.defineProperty(i.prototype, "currentLevelIndex", {
				get: function() {
					return this._currentLevelIndex
				},
				set: function(e) {
					0 != e && e != this._currentLevelIndex && this.game.time.now - this.wheelSoundLastTimestamp > t.Settings.LEVELS_WHEEL_MIN_SOUND_INTERVAL && (t.App.instance.sound.play("wheel", .7), this.animateArrow(this._currentLevelIndex, e), this.wheelSoundLastTimestamp = this.game.time.now, this.isPlayButtonEnabled && this.hidePlayButton(), this.isWheelPressed && t.TutorialManager.instance.dispatchWheelRotate(this.wheel.x, this.wheel.y)), this._currentLevelIndex = e
				},
				enumerable: !0,
				configurable: !0
			}), i.firstTimeSpinned = !1, i
		}(t.AutoResizeableState);
		t.LevelsMap = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends(i, e), i.prototype.create = function() {
				this.game.time.advancedTiming = !0, this.buildContent(), localStorage.getItem("muted") && (game.sound.mute = !0), this.updateSoundButtons(), t.Settings.MUSIC_ENABLED_BY_DEFAULT && t.SoundController.instance.switchToMenuMusic(), t.WindowManager.instance.endTransition(), gradle.event("SCREEN_HOME")
			}, i.prototype.buildContent = function() {
				this.maskGraphics = this.addChild(this.game.make.graphics(0, -t.CustomScaleManager.ORIGINAL_WIDTH / 4)), this.maskGraphics.beginFill(0, 1).drawRect(0, 0, t.CustomScaleManager.ORIGINAL_WIDTH, 3 * t.CustomScaleManager.ORIGINAL_WIDTH).endFill(), this.container.mask = this.maskGraphics, this.bottomGrass = this.addChild(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT, t.Settings.UI_ATLAS, "menuGrassBottom0000")), this.bottomGrass.anchor.set(.5, 1), this.logo = this.addChild(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2, -18, t.Settings.UI_ATLAS, "gameLogo0000")), this.logo.anchor.set(.5), this.subLogo = this.addChild(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2, 210, t.Settings.UI_ATLAS, "gameSubLogo0000")), this.subLogo.anchor.set(.5), this.monster = this.addChild(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2, -480, t.Settings.UI_ATLAS, "monsterMainMenu0000")), this.monster.anchor.set(.5, 1), this.foregroundGrass = this.addChild(this.game.make.sprite(t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 128, t.Settings.UI_ATLAS, "grassMainMenu0000")), this.foregroundGrass.anchor.set(.5), this.buttonPlay = this.addChild(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonPlayMainMenu", t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 260, this.playClicked, this)), this.buttonPlay.scale.set(.9), this.buttonPlay.anchor.set(.5), 
                this.buttonCredits = this.addChild(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonSoundOffMainMenu", t.CustomScaleManager.ORIGINAL_WIDTH / 1 - 2000, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 400, this.creditsClicked, this)), this.buttonCredits.anchor.set(.5),
                this.buttonSoundOn = this.addChild(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonSoundOnMainMenu", t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 500, this.soundOnClicked, this)), this.buttonSoundOn.anchor.set(.5), 
                this.buttonSoundOff = this.addChild(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonSoundOffMainMenu", t.CustomScaleManager.ORIGINAL_WIDTH / 2 , t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 500, this.soundOffClicked, this)), this.buttonSoundOff.anchor.set(.5), this.resize(0, 0), this.animateContent()
			}, i.prototype.resize = function(i, n) {
				e.prototype.resize.call(this, i, n), this.bottomGrass && (this.bottomGrass.y = t.CustomScaleManager.ORIGINAL_HEIGHT + (Math.min(t.CustomScaleManager.HEIGHT / t.CustomScaleManager.SCALE_Y, 2 * t.CustomScaleManager.ORIGINAL_WIDTH) - t.CustomScaleManager.ORIGINAL_HEIGHT) / 2)
			}, i.prototype.animateContent = function() {
				var e = this;
				this.monster.y = -480, this.monster.scale.set(1, 1), this.game.add.tween(this.monster).to({
					y: t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 140
				}, 820, Phaser.Easing.Cubic.In, !0, 100).onComplete.add((function() {
					e.game.sound.play("idol_hit_main_menu", .7), e.game.camera.shake(.008, 250)
				})), this.game.add.tween(this.monster.scale).to({
					x: 1.11,
					y: .88
				}, 120, Phaser.Easing.Linear.None, !0, 800, 0, !0).onComplete.add((function() {
					var t = e.game.add.tween(e.monster.scale).to({
							x: 1.01,
							y: .99
						}, 1500, Phaser.Easing.Sinusoidal.Out, !0),
						i = e.game.add.tween(e.monster.scale).to({
							x: .99,
							y: 1.01
						}, 1500, Phaser.Easing.Sinusoidal.In);
					t.chain(i), i.chain(t)
				})), this.logo.y = -340, this.game.add.tween(this.logo).to({
					y: 140
				}, 800, Phaser.Easing.Back.Out, !0, 850), this.subLogo.alpha = 0, this.subLogo.y = 235, this.subLogo.scale.set(.5), this.game.add.tween(this.subLogo.scale).to({
					x: 1,
					y: 1
				}, 300, Phaser.Easing.Sinusoidal.Out, !0, 1450), this.game.add.tween(this.subLogo).to({
					alpha: 1,
					y: 215
				}, 300, Phaser.Easing.Linear.None, !0, 1450).onComplete.add((function() {
					e.game.add.tween(e.subLogo.scale).to({
						x: 1.02,
						y: 1.02
					}, 1500, Phaser.Easing.Linear.None, !0, 0, -1, !0)
				}))
			}, i.prototype.playClicked = function() {
				this.game.sound.play("click", .9), t.WindowManager.instance.transitionTo("LevelsMap")
			}, i.prototype.moreClicked = function() {
				this.game.sound.play("click", .9), t.App.instance.navigateToSponsor()
			}, i.prototype.creditsClicked = function() {
				this.game.sound.play("click", .9), t.WindowManager.instance.showCredits()
			}, i.prototype.soundOnClicked = function() {
				this.game.sound.mute = !0, this.updateSoundButtons(), this.game.sound.play("click", .9), gradle.event("EVENT_VOLUMECHANGE", {
					bgmVolume: 0,
					sfxVolume: 0
				}), localStorage.setItem("muted", !0)
			}, i.prototype.soundOffClicked = function() {
				this.game.sound.mute = !1, this.updateSoundButtons(), this.game.sound.play("click", .9), gradle.event("EVENT_VOLUMECHANGE", {
					bgmVolume: 1,
					sfxVolume: 1
				}), localStorage.removeItem("muted")
			}, i.prototype.updateSoundButtons = function() {
				this.game.sound.mute ? (this.buttonSoundOn.visible = !1, this.buttonSoundOff.visible = !0) : (this.buttonSoundOn.visible = !0, this.buttonSoundOff.visible = !1)
			}, i
		}(t.AutoResizeableState);
		t.MainMenu = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends(i, e), i.prototype.preload = function() {
				t.Settings.ENABLE_PRELOADER_OUTPUT && this.enableDebugOutput(), this.preloaderIcon = this.addChild(this.game.make.sprite(this.containerWidth / 2 - 5, this.containerHeight / 2 - 140, t.Settings.PRELOADER_ATLAS, "preloaderIcon0000")), this.preloaderIcon.anchor.setTo(.5, .5), this.game.add.tween(this.preloaderIcon.scale).to({
					x: .96,
					y: .96
				}, 1e3, Phaser.Easing.Linear.None, !0, 0, -1, !0), this.preloaderBack = this.addChild(this.game.make.sprite(this.containerWidth / 2 + 2, this.containerHeight / 2 + 2, t.Settings.PRELOADER_ATLAS, "preloaderBack0000")), this.preloaderBack.anchor.setTo(.5, .5), this.preloaderBar = this.addChild(this.game.make.sprite(this.containerWidth / 2 - 181, this.containerHeight / 2, t.Settings.PRELOADER_ATLAS, "preloaderBar0000")), this.preloaderBar.anchor.setTo(0, .5), this.originalBarWidth = this.preloaderBar.width, this.preloaderFront = this.addChild(this.game.make.sprite(this.containerWidth / 2, this.containerHeight / 2, t.Settings.PRELOADER_ATLAS, "preloaderFront0000")), this.preloaderFront.anchor.setTo(.5, .5), this.addChild(t.TextUtils.getShadowText(t.Settings.GAME_VERSION, 6, 6, 12, "#ffffff", "#462B1F", 1, 4)), this.preloadText = t.TextUtils.getShadowText("0%", this.containerWidth / 2, this.containerHeight / 2, 32, "#ffffff", "#462B1F", 0, 5), this.addChild(this.preloadText), this.currentFileText = t.TextUtils.getStyledText("", this.containerWidth / 2, this.containerHeight - 20, 16, "#ffffff", "#462B1F", 4), this.addChild(this.currentFileText), this.game.load.onFileStart.add(this.onFileStart, this), this.game.load.onFileComplete.add(this.onFileComplete, this), this.game.load.onLoadComplete.add(this.onLoadingComplete, this), this.initSoundNames();
				for (var e = 0, i = this.soundNames; e < i.length; e++) {
					var n = i[e];
					this.game.load.audio(n, ["sound/webm/" + n + ".webm"])
				}
				this.game.load.atlas(t.Settings.GAME_ATLAS, "img/" + t.Settings.GAME_ATLAS + ".png", "img/" + t.Settings.GAME_ATLAS + ".json"), this.game.load.atlas(t.Settings.UI_ATLAS, "img/" + t.Settings.UI_ATLAS + ".png", "img/" + t.Settings.UI_ATLAS + ".json"), this.game.load.atlas(t.Settings.FX_ATLAS, "img/" + t.Settings.FX_ATLAS + ".png", "img/" + t.Settings.FX_ATLAS + ".json"), this.game.load.image("background1", "img/backgrounds/background1.png"), this.game.load.image("frame", "img/backgrounds/frame.png"), this.game.load.image("levels", "img/backgrounds/levels.png"), this.game.device.desktop
			}, i.prototype.create = function() {}, i.prototype.onFileStart = function(e, i, n) {
				t.Settings.ENABLE_PRELOADER_OUTPUT && this.currentFileText.setText("" + n)
			}, i.prototype.onFileComplete = function(t, e, i, n, a) {
				this.preloaderBar.width = .95 * t / 100 * this.originalBarWidth, this.preloadText.setText(Phaser.Math.roundTo(.95 * t, 0) + "%")
			}, i.prototype.onLoadingComplete = function() {
				t.LocalStorageController.instance.loadSave(), t.WindowManager.instance.init(), t.LevelStorage.instance, t.LevelManager.instance, t.SoundController.instance.isDecodingSupported() ? this.game.sound.setDecodedCallback(this.soundNames, this.onSoundsDecoded, this) : this.onSoundsDecoded()
			}, i.prototype.onSoundsDecoded = function() {
				this.preloaderBar.width = 1 * this.originalBarWidth, this.preloadText.setText("100%"), t.WindowManager.instance.transitionTo("MainMenu")
			}, i.prototype.initSoundNames = function() {
				this.soundNames = ["coin_bonus", "pop", "gap_collapsing", "gap_bonus", "ball_inserting", "idol_mouth_opening", "idol_mouth_closing", "path_initialization", "bomb_explosion", "defeat_heartbeat", "scores_counting", "click", "swish_left", "swish_right", "ball_swap01", "ball_swap02", "fireball_picking_up", "fireball_shot", "shot01", "shot02", "rewind", "platform_change", "powerup_appearing", "lazer", "lighting", "victory", "ball_destroying", "torch_start", "torch_loop", "freezing", "unfreezing", "rolling_balls", "idol_hit_main_menu", "combo1", "combo2", "combo3", "combo4", "combo5", "combo6", "combo7", "combo8", "combo9", "combo10", "wheel", "themeA", "themeB", "themeC"]
			}, i.prototype.enableDebugOutput = function() {
				var t = gradle.event;
				gradle.event = function() {
					t.apply(console, arguments);
					for (var e = Array.prototype.slice.call(arguments), i = 0; i < e.length; i++) debugLog.push("" + e[i])
				}, window.onerror = function(t, e, i) {
					gradle.event("#JS error: " + t + " on line " + i + " for " + e)
				}
			}, i.prototype.update = function() {
				if (t.Settings.ENABLE_PRELOADER_OUTPUT)
					for (var e = 0, i = debugLog; e < i.length; e++) {
						var n = i[e];
						this.game.debug.text(n, 10, 10 + 15 * debugLog.indexOf(n), -1 != n.indexOf("#JS error") ? "#FF0000" : "#000000")
					}
			}, i
		}(t.AutoResizeableState);
		t.Preloader = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				var i = e.call(this, t.App.instance, null) || this;
				return i.onCompleteCallback = null, i.actionRadius = 10, i.isActive = !1, i.buildSprites(), i
			}
			return __extends(i, e), i.prototype.buildSprites = function() {
				this.circle = this.add(this.game.make.sprite(0, 8, t.Settings.FX_ATLAS, "pointerAnim0000")), this.circle.anchor.set(.5), this.circleRotationAnimation = this.circle.animations.add("circleRotation", Phaser.Animation.generateFrameNames("pointerAnim", 0, 13, "", 4), 30, !0), this.hand = this.add(this.game.make.sprite(-10, -40, t.Settings.FX_ATLAS, "tapAnim0000")), this.hand.anchor.set(0), this.tapAnimation = this.hand.animations.add("tapAnimation", Phaser.Animation.generateFrameNames("tapAnim", 0, 15, "", 4), 30, !1), this.handInTween = this.game.add.tween(this.hand).to({
					x: -20,
					y: -35
				}, 400, Phaser.Easing.Linear.None, !1)
			}, i.prototype.start = function() {
				var e = this;
				this.stop(), this.isActive = !0, this.circleRotationAnimation.play(), this.tapAnimation.onComplete.add((function() {
					return e.delayEvent = e.game.time.events.add(1e3, (function() {
						return e.tapAnimation.play()
					}))
				})), this.handInTween.onComplete.addOnce((function() {
					return e.tapAnimation.restart()
				})), this.hand.position.set(35, 30), this.alpha = 0, t.App.instance.add.tween(this).to({
					alpha: 1
				}, 600, Phaser.Easing.Linear.None, !0, 500).onComplete.add((function() {
					return e.handInTween.start()
				}))
			}, i.prototype.stop = function() {
				this.isActive = !1, this.circleRotationAnimation.stop(), this.handInTween.onComplete.removeAll(), this.tapAnimation.onComplete.removeAll(), t.App.instance.time.events.remove(this.delayEvent), this.tapAnimation.stop(!0)
			}, i.prototype.completedHandler = function() {
				this.onCompleteCallback && this.onCompleteCallback(), this.removeFromParent()
			}, i.prototype.showAt = function(t, e) {
				this.onCompleteCallback = e, t.add(this), this.start()
			}, i.prototype.dispatchToggleEvent = function(e, i) {
				var n = this;
				Phaser.Math.distance(this.x, this.y, e, i) <= this.actionRadius && t.App.instance.add.tween(this).to({
					alpha: 0
				}, 300, Phaser.Easing.Linear.None, !0).onComplete.add((function() {
					return n.completedHandler()
				}))
			}, i.prototype.removeFromParent = function() {
				this.onCompleteCallback = null, this.stop(), this.parent && this.parent.removeChild(this)
			}, i.prototype.destroy = function() {
				this.removeFromParent()
			}, i
		}(Phaser.Group);
		t.BaseTutorial = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t, i) {
				var n = e.call(this) || this;
				return n.position.set(t, i), n.actionRadius = 50, n
			}
			return __extends(i, e), i.prototype.buildSprites = function() {
				this.circle = this.add(this.game.make.sprite(0, 8, t.Settings.FX_ATLAS, "pointerAnim0000")), this.circle.anchor.set(.5), this.circleRotationAnimation = this.circle.animations.add("circleRotation", Phaser.Animation.generateFrameNames("pointerAnim", 0, 13, "", 4), 30, !0), this.hand = this.add(this.game.make.sprite(270, -30, t.Settings.FX_ATLAS, "tapAnim0000")), this.hand.anchor.set(0), this.tapAnimation = this.hand.animations.add("tapAnimation", Phaser.Animation.generateFrameNames("tapAnim", 0, 7, "", 4), 30, !1), this.releaseAnimation = this.hand.animations.add("releaseAnimation", Phaser.Animation.generateFrameNames("tapAnim", 7, 15, "", 4), 30, !1), this.handInTween = this.game.add.tween(this.hand).to({
					x: -20,
					y: -35
				}, 1600, Phaser.Easing.Linear.None, !1)
			}, i.prototype.start = function() {
				var e = this;
				this.stop(), this.isActive = !0, this.circleRotationAnimation.play(), this.tapAnimation.onComplete.add((function() {
					return e.delayEvent = e.game.time.events.add(200, (function() {
						return e.handInTween.start()
					}))
				})), this.handInTween.onComplete.add((function() {
					return e.releaseAnimation.restart()
				})), this.releaseAnimation.onComplete.add((function() {
					return e.restartTweening()
				})), this.alpha = 0, t.App.instance.add.tween(this).to({
					alpha: 1
				}, 750, Phaser.Easing.Linear.None, !0, 200).onComplete.add((function() {
					return e.tapAnimation.play()
				}))
			}, i.prototype.stop = function() {
				this.isActive = !1, this.circleRotationAnimation.stop(), this.handInTween.onComplete.removeAll(), this.tapAnimation.onComplete.removeAll(), this.releaseAnimation.onComplete.removeAll(), t.App.instance.time.events.remove(this.delayEvent), this.releaseAnimation.stop(!0), this.tapAnimation.stop(!0)
			}, i.prototype.completedHandler = function() {
				this.onCompleteCallback && this.onCompleteCallback(), this.removeFromParent()
			}, i.prototype.restartTweening = function() {
				var e = this;
				t.App.instance.add.tween(this.hand).to({
					alpha: 0
				}, 400, Phaser.Easing.Linear.None, !0, 500).onComplete.add((function() {
					e.hand.position.set(270, -30), t.App.instance.add.tween(e.hand).to({
						alpha: 1
					}, 500, Phaser.Easing.Linear.None, !0, 800).onComplete.add((function() {
						return e.tapAnimation.restart()
					}))
				}))
			}, i
		}(t.BaseTutorial);
		t.AimTutorial = e
	}(src || (src = {})),
	function(t) {
		var e = function(t) {
			function e(e, i) {
				var n = t.call(this) || this;
				return n.circle.scale.set(1.5), n.position.set(e, i), n.actionRadius = 50, n
			}
			return __extends(e, t), e
		}(t.BaseTutorial);
		t.ChangePlatformTutorial = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(t, i) {
				var n = e.call(this) || this;
				return n.rotateRadius = 235, n.startAngle = -Math.PI / 3, n.endAngle = Math.PI / 3, n.prevAngle = n.startAngle, n.currentAngle = n.startAngle, n.duration = 1100, n.buildAdditionalSprites(), n.position.set(t, i), n.actionRadius = 275, n
			}
			return __extends(i, e), i.prototype.buildSprites = function() {}, i.prototype.buildAdditionalSprites = function() {
				var e = this;
				this.initialPosition = new Phaser.Point(0, -this.rotateRadius), this.initialPosition.rotate(0, 0, this.startAngle), this.currentPosition = this.initialPosition.clone(), this.hand = this.add(this.game.make.sprite(this.currentPosition.x - 20, this.currentPosition.y - 35, t.Settings.FX_ATLAS, "tapAnim0000")), this.hand.scale.set(1.4), this.hand.anchor.set(0), this.tapAnimation = this.hand.animations.add("tapAnimation", Phaser.Animation.generateFrameNames("tapAnim", 0, 7, "", 4), 30, !1), this.releaseAnimation = this.hand.animations.add("releaseAnimation", Phaser.Animation.generateFrameNames("tapAnim", 7, 15, "", 4), 30, !1), this.handInTween = this.game.add.tween(this).to({
					currentAngle: this.endAngle
				}, this.duration, Phaser.Easing.Linear.None, !1).onUpdateCallback((function() {
					return e.updateRotation()
				}))
			}, i.prototype.start = function() {
				var e = this;
				this.stop(), this.isActive = !0, this.tapAnimation.onComplete.add((function() {
					return e.delayEvent = e.game.time.events.add(50, (function() {
						return e.handInTween.start()
					}))
				})), this.handInTween.onComplete.add((function() {
					return e.releaseAnimation.restart()
				})), this.releaseAnimation.onComplete.add((function() {
					return e.returnToStartPosition()
				})), this.alpha = 0, t.App.instance.add.tween(this).to({
					alpha: 1
				}, 750, Phaser.Easing.Linear.None, !0, 500).onComplete.add((function() {
					return e.tapAnimation.play()
				}))
			}, i.prototype.stop = function() {
				this.isActive = !1, this.handInTween.onComplete.removeAll(), this.tapAnimation.onComplete.removeAll(), this.releaseAnimation.onComplete.removeAll(), t.App.instance.time.events.remove(this.delayEvent), this.releaseAnimation.stop(!0), this.tapAnimation.stop(!0)
			}, i.prototype.updateRotation = function() {
				this.currentPosition = this.currentPosition.rotate(0, 0, this.currentAngle - this.prevAngle), this.hand.position.set(this.currentPosition.x - 20, this.currentPosition.y - 35), this.prevAngle = this.currentAngle
			}, i.prototype.returnToStartPosition = function() {
				var e = this;
				this.prevAngle = this.startAngle, this.currentAngle = this.startAngle, this.currentPosition = this.initialPosition.clone(), t.App.instance.add.tween(this.hand).to({
					x: this.initialPosition.x - 20,
					y: this.initialPosition.y - 35
				}, 500, Phaser.Easing.Linear.None, !0, 150).onComplete.add((function() {
					return e.tapAnimation.restart()
				}))
			}, i
		}(t.BaseTutorial);
		t.RotateWheelTutorial = e
	}(src || (src = {})),
	function(t) {
		var e = function(t) {
			function e(e, i) {
				var n = t.call(this) || this;
				return n.circle.scale.set(1.7), n.hand.scale.set(1.3), n.position.set(e, i), n.actionRadius = 50, n
			}
			return __extends(e, t), e
		}(t.BaseTutorial);
		t.SwapBallsTutorial = e
	}(src || (src = {})),
	function(t) {
		var e = function(t) {
			function e(e, i) {
				var n = t.call(this) || this;
				return n.position.set(e, i), n.actionRadius = 50, n
			}
			return __extends(e, t), e
		}(t.BaseTutorial);
		t.TapHereTutorial = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				var i = e.call(this, t.App.instance, null) || this;
				return i.isFirstStageCompleted = !1, i.isSecondStageCompleted = !1, i.isWheelTutorialCompleted = !1, i.tapHereTutorialA = new t.TapHereTutorial(100, 300), i.tapHereTutorialB = new t.TapHereTutorial(490, 180), i.aimTutorial = new t.AimTutorial(200, 175), i.swapBallsTutorial = new t.SwapBallsTutorial(312, 505), i.changePlatformTutorialA = new t.ChangePlatformTutorial(381, 659), i.changePlatformTutorialB = new t.ChangePlatformTutorial(268, 289), i.wheelRotateTutorial = new t.RotateWheelTutorial(t.CustomScaleManager.ORIGINAL_WIDTH / 2 - 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 184), i
			}
			return __extends(i, e), Object.defineProperty(i, "instance", {
				get: function() {
					return i._instance ? i._instance : i._instance = new i
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.dispatchLevelStart = function(e) {
				var i = this,
					n = t.App.instance.state.getCurrentState();
				n && (1 != t.Settings.CURRENT_LEVEL || this.isFirstStageCompleted ? 6 != t.Settings.CURRENT_LEVEL || this.isSecondStageCompleted ? e() : (t.App.instance.state.getCurrentState().cannonManager.cannon.start(), this.changePlatformTutorialA.showAt(n.container, (function() {
					return i.changePlatformTutorialB.showAt(n.container, (function() {
						return i.completedSecondStage(e)
					}))
				}))) : (t.App.instance.state.getCurrentState().cannonManager.cannon.start(), this.game.device.desktop ? this.tapHereTutorialA.showAt(n.container, (function() {
					return i.tapHereTutorialB.showAt(n.container, (function() {
						return i.swapBallsTutorial.showAt(n.container, (function() {
							return i.completedFirstStage(e)
						}))
					}))
				})) : this.tapHereTutorialA.showAt(n.container, (function() {
					return i.tapHereTutorialB.showAt(n.container, (function() {
						return i.aimTutorial.showAt(n.container, (function() {
							return i.swapBallsTutorial.showAt(n.container, (function() {
								return i.completedFirstStage(e)
							}))
						}))
					}))
				}))))
			}, i.prototype.dispatchLevelsMapOpening = function() {
				var e = this;
				if (t.App.instance.state.getCurrentState() instanceof t.LevelsMap) {
					var i = t.App.instance.state.getCurrentState();
					t.Settings.LAST_UNLOCKED_LEVEL > 1 && !this.isWheelTutorialCompleted && this.wheelRotateTutorial.showAt(i.responsiveContainer, (function() {
						return e.completedWheelStage()
					}))
				}
			}, i.prototype.dispatchShoot = function(t) {
				this.tapHereTutorialA.isActive && this.tapHereTutorialA.dispatchToggleEvent(t.x, t.y), this.tapHereTutorialB.isActive && this.tapHereTutorialB.dispatchToggleEvent(t.x, t.y), this.aimTutorial.isActive && this.aimTutorial.dispatchToggleEvent(t.x, t.y)
			}, i.prototype.dispatchBallsSwap = function(t) {
				this.swapBallsTutorial.isActive && this.swapBallsTutorial.dispatchToggleEvent(t.x, t.y)
			}, i.prototype.dispatchPlatformChange = function(t) {
				this.changePlatformTutorialA.isActive && this.changePlatformTutorialA.dispatchToggleEvent(t.x, t.y), this.changePlatformTutorialB.isActive && this.changePlatformTutorialB.dispatchToggleEvent(t.x, t.y)
			}, i.prototype.dispatchWheelRotate = function(t, e) {
				this.wheelRotateTutorial.isActive && this.wheelRotateTutorial.dispatchToggleEvent(t, e)
			}, i.prototype.completedFirstStage = function(e) {
				this.isFirstStageCompleted = !0, t.LocalStorageController.instance.save(), gradle.event("EVENT_TUTORIALCOMPLETED"), e && e()
			}, i.prototype.completedSecondStage = function(e) {
				this.isSecondStageCompleted = !0, t.LocalStorageController.instance.save(), e && e()
			}, i.prototype.completedWheelStage = function() {
				this.isWheelTutorialCompleted = !0, t.LocalStorageController.instance.save()
			}, i._instance = null, i
		}(Phaser.Group);
		t.TutorialManager = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {}
			return e.getDecimal = function(t) {
				return t % 1
			}, e.pointOnCircle = function(e, i, n) {
				var a;
				a = e - 1.5 * n < 0 ? .25 : e + 1.5 * n > t.CustomScaleManager.ORIGINAL_WIDTH ? 1.25 : Math.random() > .5 ? .25 : 1.25;
				var s = Math.PI * (a + .5 * Math.random()) - Math.PI / 2;
				return new Phaser.Point(e + n * Math.cos(s), i + n * Math.sin(s))
			}, e.pointOnSegment = function(t, e, i, n, a) {
				var s = Math.sqrt((i - t) * (i - t) + (n - e) * (n - e));
				if (0 == s) return new Phaser.Point(t, e);
				var o = new Phaser.Point;
				return o.x = t + a * (i - t) / s, o.y = e + a * (n - e) / s, o
			}, e.pointOnSegmentRelative = function(t, e, i, n, a) {
				var s = Math.sqrt((i - t) * (i - t) + (n - e) * (n - e));
				if (0 == s) return new Phaser.Point(t, e);
				var o = s * a,
					r = new Phaser.Point;
				return r.x = t + o * (i - t) / s, r.y = e + o * (n - e) / s, r
			}, e.getRelativePosition = function(t, e, i, n, a) {
				var s = Math.sqrt((i - t) * (i - t) + (n - e) * (n - e));
				return 0 == s ? 0 : i != t ? (a.x - t) * s / (i - t) / s : n != e ? (a.y - e) * s / (n - e) / s : 0
			}, e.findLineCircleIntersections = function(t, i, n, a, s, o, r, l) {
				var h, c, u, p, g, d;
				if (void 0 === l && (l = !0), g = (p = 2 * ((h = o - a) * (a - t) + (c = r - s) * (s - i))) * p - 4 * (u = h * h + c * c) * ((a - t) * (a - t) + (s - i) * (s - i) - n * n), u <= 1e-7 || g < 0) return null;
				if (0 == g) {
					d = -p / (2 * u);
					var m = new Phaser.Point(a + d * h, s + d * c);
					return e.checkPointBelongsToSegment(m.x, m.y, a, s, o, r) ? m : null
				}
				d = (-p + Math.sqrt(g)) / (2 * u);
				var S = new Phaser.Point(a + d * h, s + d * c);
				d = (-p - Math.sqrt(g)) / (2 * u);
				var A = new Phaser.Point(a + d * h, s + d * c);
				return S = e.checkPointBelongsToSegment(S.x, S.y, a, s, o, r) ? S : null, A = e.checkPointBelongsToSegment(A.x, A.y, a, s, o, r) ? A : null, S && A ? Phaser.Math.distance(a, s, S.x, S.y) <= Phaser.Math.distance(a, s, A.x, A.y) ? l ? S : A : l ? A : S : S || A || null
			}, e.checkPointBelongsToSegment = function(t, e, i, n, a, s) {
				return t >= Math.min(i, a) && t <= Math.max(i, a) && e >= Math.min(n, s) && e <= Math.max(n, s)
			}, e.onSegment = function(t, e, i) {
				return e.x <= Math.max(t.x, i.x) && e.x >= Math.min(t.x, i.x) && e.y <= Math.max(t.y, i.y) && e.y >= Math.min(t.y, i.y)
			}, e.orientation = function(t, e, i) {
				var n = (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y);
				return 0 == n ? 0 : n > 0 ? 1 : 2
			}, e.testSegmentsIntersection = function(t, i, n, a) {
				var s = e.orientation(t, i, n),
					o = e.orientation(t, i, a),
					r = e.orientation(n, a, t),
					l = e.orientation(n, a, i);
				return s != o && r != l || !(0 != s || !e.onSegment(t, n, i)) || !(0 != o || !e.onSegment(t, a, i)) || !(0 != r || !e.onSegment(n, t, a)) || !(0 != l || !e.onSegment(n, i, a))
			}, e.CollisionDetector = function() {
				function t() {}
				return t.distanceBetween = function(t, e, i, n) {
					return (t - i) * (t - i) + (e - n) * (e - n)
				}, t.distanceToSegmentSquared = function(t, i, n, a, s, o) {
					var r = e.CollisionDetector.distanceBetween(n, a, s, o);
					if (0 == r) return e.CollisionDetector.distanceBetween(t, i, n, a);
					var l = ((t - n) * (s - n) + (i - a) * (o - a)) / r;
					return l < 0 ? e.CollisionDetector.distanceBetween(t, i, n, a) : l > 1 ? e.CollisionDetector.distanceBetween(t, i, s, o) : e.CollisionDetector.distanceBetween(t, i, n + l * (s - n), a + l * (o - a))
				}, t.getCollisionPoint = function(t, i, n, a, s, o) {
					var r = e.CollisionDetector.distanceBetween(n, a, s, o);
					if (0 == r) return new Phaser.Point(n, a);
					var l = ((t - n) * (s - n) + (i - a) * (o - a)) / r;
					return l < 0 ? new Phaser.Point(n, a) : l > 1 ? new Phaser.Point(s, o) : new Phaser.Point(n + l * (s - n), a + l * (o - a))
				}, t.distanceToSegment = function(t, i, n) {
					return Math.sqrt(e.CollisionDetector.distanceToSegmentSquared(t.x, t.y, i.x, i.y, n.x, n.y))
				}, t
			}(), e
		}();
		t.AdvancedMath = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {}
			return e.getComboText = function(i) {
				for (var n = new Phaser.Group(t.App.instance, null), a = "X" + Math.floor(i), s = 0; s < a.length; s++) {
					var o = e.getLetter(a.charAt(s));
					o && (o.x = 0 == s ? o.width / 2 : n.width + o.width / 2 + t.Settings.COMBO_TEXT_SPACING, n.add(o))
				}
				return n.pivot.set(n.width / 2, 0), n
			}, e.getScoreText = function(i, n) {
				for (var a = new Phaser.Group(t.App.instance, null), s = "+" + Math.floor(i), o = 0; o < s.length; o++) {
					var r = e.getLetter(s.charAt(o), n);
					r && (r.x = 0 == o ? r.width / 2 : a.width + r.width / 2 + t.Settings.SCORE_TEXT_SPACING, a.add(r))
				}
				return a.pivot.set(a.width / 2, 0), a
			}, e.getLevelText = function(i, n) {
				for (var a = new Phaser.Group(t.App.instance, null), s = "" + Math.floor(i), o = 0; o < s.length; o++) {
					var r = e.getLetter(s.charAt(o), n);
					r && (r.x = 0 == o ? r.width / 2 : a.width + r.width / 2 + t.Settings.SCORE_TEXT_SPACING, a.add(r))
				}
				return a.pivot.set(a.width / 2, 0), a
			}, e.getLetter = function(i, n) {
				void 0 === n && (n = -1);
				var a = null;
				switch (i) {
					case "X":
						a = "textX000" + e.getColorFrame(n);
						break;
					case "+":
						a = "textPlus000" + e.getColorFrame(n);
						break;
					case "1":
						a = "text1000" + e.getColorFrame(n);
						break;
					case "2":
						a = "text2000" + e.getColorFrame(n);
						break;
					case "3":
						a = "text3000" + e.getColorFrame(n);
						break;
					case "4":
						a = "text4000" + e.getColorFrame(n);
						break;
					case "5":
						a = "text5000" + e.getColorFrame(n);
						break;
					case "6":
						a = "text6000" + e.getColorFrame(n);
						break;
					case "7":
						a = "text7000" + e.getColorFrame(n);
						break;
					case "8":
						a = "text8000" + e.getColorFrame(n);
						break;
					case "9":
						a = "text9000" + e.getColorFrame(n);
						break;
					case "0":
						a = "text0000" + e.getColorFrame(n)
				}
				if (!a) return null;
				var s = new Phaser.Sprite(t.App.instance, 0, 0, t.Settings.GAME_ATLAS, a);
				return s.anchor.setTo(.5, .5), s
			}, e.getColorFrame = function(e) {
				var i = 0;
				switch (e) {
					case t.BallColor.BLACK:
						i = 8;
						break;
					case t.BallColor.BLUE:
						i = 4;
						break;
					case t.BallColor.GRAY:
						i = 7;
						break;
					case t.BallColor.GREEN:
						i = 3;
						break;
					case t.BallColor.PURPLE:
						i = 5;
						break;
					case t.BallColor.CYAN:
						i = 6;
						break;
					case t.BallColor.YELLOW:
						i = 2;
						break;
					case t.BallColor.RED:
						i = 1;
						break;
					default:
						i = 0
				}
				return i
			}, e
		}();
		t.BitmapTextFactory = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {}
			return e.createButton = function(e, i, n, a, s, o) {
				var r = new Phaser.Button(t.App.instance, n, a, e, s, o, i + "0001", i + "0000", i + "0002", i + "0000");
				return r.anchor.setTo(.5, .5), r.input.pixelPerfectClick = !0, r.input.useHandCursor = !0, r
			}, e.createSimpleButton = function(i, n, a, s, o, r, l) {
				var h = new Phaser.Button(t.App.instance, a, s, i, r, l, n + "0000", n + "0000", n + "0000", n + "0000");
				return h.anchor.setTo(.5, .5), h.scale.set(o), h.input.pixelPerfectClick = !0, h.input.useHandCursor = !1, h.overTween = t.App.instance.add.tween(h.scale).to({
					x: 1.05 * o,
					y: 1.05 * o
				}, 100), h.outTween = t.App.instance.add.tween(h.scale).to({
					x: 1 * o,
					y: 1 * o
				}, 100), h.downTween = t.App.instance.add.tween(h.scale).to({
					x: .95 * o,
					y: .95 * o
				}, 50).to({
					x: 1 * o,
					y: 1 * o
				}, 50), h.events.onInputOver.add(e.mouseOverHandler, this, 0), h.events.onInputOut.add(e.mouseOutHandler, this, 0), h.events.onInputDown.add(e.mouseDownHandler, this, 0), h
			}, e.mouseOverHandler = function(e) {
				t.App.instance.add.tween(e.scale).to({
					x: 1.05 * t.CustomScaleManager.SCALE_X,
					y: 1.05 * t.CustomScaleManager.SCALE_Y
				}, 100).start()
			}, e.mouseOutHandler = function(e) {
				t.App.instance.add.tween(e.scale).to({
					x: 1 * t.CustomScaleManager.SCALE_X,
					y: 1 * t.CustomScaleManager.SCALE_Y
				}, 100).start()
			}, e.mouseDownHandler = function(e) {
				t.App.instance.add.tween(e.scale).to({
					x: .95 * t.CustomScaleManager.SCALE_X,
					y: .95 * t.CustomScaleManager.SCALE_Y
				}, 50).to({
					x: 1 * t.CustomScaleManager.SCALE_X,
					y: 1 * t.CustomScaleManager.SCALE_Y
				}, 50).start()
			}, e
		}();
		t.ButtonUtils = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function t() {
				this.len = 0, this.rPos = 0, this.res = []
			}
			return Object.defineProperty(t, "instance", {
				get: function() {
					return t._instance ? t._instance : t._instance = new t
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.getCurvePointsClassic = function(t, e, i, n) {
				return void 0 === e && (e = .5), void 0 === i && (i = 25), void 0 === n && (n = !1), getCurvePoints(t, e, i, n)
			}, t.prototype.getCurvePoints = function(t, e, i) {
				if (void 0 === e && (e = .5), void 0 === i && (i = !1), !t || t.length < 2) return [];
				this.rPos = 0, this.res = [], this.len = t.length;
				var n = t.slice(0);
				return i ? (n.unshift(t[this.len - 1]), n.unshift(t[this.len - 2]), n.push(t[0], t[1])) : (n.unshift(t[1]), n.unshift(t[0]), n.push(t[this.len - 2], t[this.len - 1])), this.parse(n, this.len, e), i && ((n = []).push(t[this.len - 4], t[this.len - 3], t[this.len - 2], t[this.len - 1], t[0], t[1], t[2], t[3]), this.parse(n, 4, e)), this.len = i ? 0 : t.length - 2, this.res[this.rPos++] = t[this.len++], this.res[this.rPos] = t[this.len], this.res
			}, t.prototype.parse = function(e, i, n) {
				for (var a, s = 2; s < i; s += 2) {
					var o, r, l, h, c = e[s],
						u = e[s + 1],
						p = e[s + 2],
						g = e[s + 3],
						d = (p - e[s - 2]) * n,
						m = (g - e[s - 1]) * n,
						S = (e[s + 4] - c) * n,
						A = (e[s + 5] - u) * n,
						f = 0,
						E = Phaser.Math.distance(c, u, p, g) / t.DIVISOR;
					E = E < 1 ? 1 : Math.floor(E);
					var L = this.getCache(E);
					for (a = 0; a < E; a++) o = L[f++], r = L[f++], l = L[f++], h = L[f++], this.res[this.rPos++] = o * c + r * p + l * d + h * S, this.res[this.rPos++] = o * u + r * g + l * m + h * A
				}
			}, t.prototype.getCache = function(t) {
				var e = [],
					i = 4,
					n = 1;
				for (e[0] = 1; n < t; n++) {
					var a = n / t,
						s = a * a,
						o = s * a,
						r = 2 * o,
						l = 3 * s;
					e[i++] = r - l + 1, e[i++] = l - r, e[i++] = o - 2 * s + a, e[i++] = o - s
				}
				return e[++i] = 1, e
			}, t.DIVISOR = 10, t
		}();
		t.CurveCalculator = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function t() {}
			return t.getText = function(t) {
				return t || "NO_TRANSLATION_YET"
			}, t
		}();
		t.LocalizationManager = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {
				this.isLocalStorageSupported = !1, this.data = null, localStorage = localStorage || window.localStorage, this.data = {
					level: 1,
					tutorialFirstStageCompleted: !1,
					tutorialSecondStageCompleted: !1,
					wheelTutorialCompleted: !1,
					wheelFirstTimeSpin: !gradle.wheelFirstTime,
					scores: []
				};
				for (var e = 0; e < t.Settings.TOTAL_LEVELS + 1; e++) this.data.scores.push(0)
			}
			return Object.defineProperty(e, "instance", {
				get: function() {
					return e._instance ? e._instance : e._instance = new e
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getScores = function() {
				return this.data.scores
			}, e.prototype.getLastUnlockedLevel = function() {
				return this.data.level
			}, e.prototype.save = function() {
				this.data.scores = t.ScoreManager.instance.getScores(), this.data.level = t.Settings.LAST_UNLOCKED_LEVEL, this.data.tutorialFirstStageCompleted = t.TutorialManager.instance.isFirstStageCompleted, this.data.tutorialSecondStageCompleted = t.TutorialManager.instance.isSecondStageCompleted, this.data.wheelTutorialCompleted = t.TutorialManager.instance.isWheelTutorialCompleted, this.data.wheelFirstTimeSpin = t.LevelsMap.firstTimeSpinned, this.isLocalStorageSupported && localStorage.setItem(t.Settings.STORAGE_NAME, JSON.stringify(this.data))
			}, e.prototype.checkLocalStorageSupported = function() {
				try {
					this.isLocalStorageSupported = "localStorage" in window && null !== window.localStorage
				} catch (t) {
					this.isLocalStorageSupported = !1
				}
			}, e.prototype.loadSave = function() {
				this.checkLocalStorageSupported(), this.isLocalStorageSupported && (localStorage.getItem(t.Settings.STORAGE_NAME) ? this.data = JSON.parse(localStorage.getItem(t.Settings.STORAGE_NAME)) : localStorage.setItem(t.Settings.STORAGE_NAME, JSON.stringify(this.data))), this.finalizeLoading()
			}, e.prototype.finalizeLoading = function() {
				t.ScoreManager.instance.init(e.instance.getScores()), t.Settings.LAST_UNLOCKED_LEVEL = e.instance.getLastUnlockedLevel(), t.TutorialManager.instance.isFirstStageCompleted = this.data.tutorialFirstStageCompleted, t.TutorialManager.instance.isSecondStageCompleted = this.data.tutorialSecondStageCompleted, t.TutorialManager.instance.isWheelTutorialCompleted = this.data.wheelTutorialCompleted || !1, t.LevelsMap.firstTimeSpinned = this.data.wheelFirstTimeSpin || !1
			}, e
		}();
		t.LocalStorageController = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {
				this.loses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.balls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.time = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.gaps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.combos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.coins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.distanceToIdol = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
			}
			return Object.defineProperty(e, "instance", {
				get: function() {
					return e._instance ? e._instance : e._instance = new e
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getUserStats = function() {
				for (var e = "", i = 1; i < t.Settings.TOTAL_LEVELS; i++) this.time[i] > 0 ? e += "============================== Level " + i + " =========================== \n                     Loses:     " + this.loses[i] + " \n                     Time:      " + t.TextUtils.convertMSToHumanTime(this.time[i]) + "\n                     Score:     " + t.LocalStorageController.instance.getScores()[i - 1] + "\n                     Balls:     " + this.balls[i] + "\n                     Gaps:      " + this.gaps[i] + "\n                     Combos:    " + this.combos[i] + "\n                     Coins:     " + this.coins[i] + "\n                     Idol in:   " + this.distanceToIdol[i] + " balls\n                     " : e += "============================== Level " + i + " =========================== \n                     Loses:     " + this.loses[i] + " \n                     ";
				return e
			}, e._instance = null, e
		}();
		t.PlayerStatisticsCollector = e
	}(src || (src = {})),
	function(t) {
		var e = function() {
			function e() {}
			return e.addText = function(i, n, a, s, o, r, l, h) {
				return void 0 === l && (l = t.Settings.DEFAULT_FONT_FAMILY), void 0 === h && (h = null), i.add(e.getText(n, a, s, o, r, l, h))
			}, e.getText = function(e, i, n, a, s, o, r) {
				void 0 === r && (r = null);
				var l = new Phaser.Text(t.App.instance, i, n, e, {
					font: (r ? r + " " : "") + a + o,
					fill: s,
					align: "center"
				});
				return l.anchor.setTo(.5, .5), l
			}, e.getShadowText = function(e, i, n, a, s, o, r, l, h, c, u, p) {
				void 0 === o && (o = "#000000"), void 0 === r && (r = 0), void 0 === l && (l = 2), void 0 === h && (h = .5), void 0 === c && (c = .5), void 0 === u && (u = t.Settings.DEFAULT_FONT_FAMILY), void 0 === p && (p = null);
				var g = new Phaser.Text(t.App.instance, i, n, e, {
					font: (p ? p + " " : "") + a + u,
					fill: s,
					align: "center"
				});
				return g.anchor.setTo(h, c), g.setShadow(r, l, o, 0), g
			}, e.getStyledText = function(e, i, n, a, s, o, r, l, h) {
				void 0 === r && (r = 4), void 0 === l && (l = t.Settings.DEFAULT_FONT_FAMILY), void 0 === h && (h = null);
				var c = new Phaser.Text(t.App.instance, i, n, e, {
					font: (h ? h + " " : "") + a + l,
					fill: s,
					stroke: o,
					strokeThickness: r,
					align: "center"
				});
				return c.setShadow(0, 2, o, 0), c.anchor.set(.5, .5), c
			}, e.convertMSToHumanTime = function(t) {
				var e = Math.floor(t / 1e3),
					i = Math.floor(e / 60),
					n = e - 60 * i;
				return (i < 10 ? "0" : "") + i + ":" + (n < 10 ? "0" : "") + n
			}, e
		}();
		t.TextUtils = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i(i, n, a) {
				void 0 === a && (a = t.Settings.WINDOW_BACKGROUND_ALPHA);
				var s = e.call(this, t.App.instance, null) || this;
				return s.backgroundAlpha = t.Settings.WINDOW_BACKGROUND_ALPHA, s.registrationPoint = new Phaser.Point(i, n), s.backgroundAlpha = a, s.visible = !1, s.buildBackground(), s.buildContent(), s
			}
			return __extends(i, e), i.prototype.buildBackground = function() {
				this.background = this.add(this.game.make.graphics(0, 0)), this.background.beginFill(0, t.Settings.WINDOW_BACKGROUND_ALPHA).drawRect(0, 0, this.game.world.width, this.game.world.height).endFill(), this.background.inputEnabled = !0
			}, i.prototype.buildContent = function() {
				this.content = this.game.make.group(this), this.content.inputEnableChildren = !0
			}, i.prototype.resize = function() {
				this.background.clear().beginFill(0, this.backgroundAlpha).drawRect(0, 0, this.game.world.width, this.game.world.height).endFill(), this.content.scale.set(t.CustomScaleManager.SCALE_X, t.CustomScaleManager.SCALE_Y), this.content.position.set(t.CustomScaleManager.WIDTH / 2 - t.CustomScaleManager.ORIGINAL_WIDTH * t.CustomScaleManager.SCALE_X / 2, t.CustomScaleManager.HEIGHT / 2 - t.CustomScaleManager.ORIGINAL_HEIGHT * t.CustomScaleManager.SCALE_Y / 2)
			}, i.prototype.show = function() {
				this.visible = !0, this.resize(), this.game.stage.addChild(this)
			}, i.prototype.hide = function() {
				this.visible = !1, this.parent && this.parent.removeChild(this)
			}, i.prototype.lockUpButtons = function() {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				for (var i = 0; i < t.length; i++) t[i].inputEnabled = !1
			}, i.prototype.unlockButtons = function() {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
				for (var i = 0; i < t.length; i++) t[i].inputEnabled = !0
			}, i.prototype.destroy = function() {
				e.prototype.destroy.call(this), this.background = null, this.content = null
			}, i
		}(Phaser.Group);
		t.BaseWindow = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return e.call(this, t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 240, .9) || this
			}
			return __extends(i, e), i.prototype.buildContent = function() {
				e.prototype.buildContent.call(this), this.buttonHome = this.content.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonHomeLevels", t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 240 + 55, this.homeClicked, this)), this.plateContainer = this.content.add(this.game.make.group(null)), this.plateContainer.position.copyFrom(this.registrationPoint), this.creditsPlate = this.plateContainer.add(this.game.make.sprite(0, -290, t.Settings.UI_ATLAS, "creditsPlate0000")), this.creditsPlate.anchor.set(.5)
			}, i.prototype.show = function() {
				gradle.enableMoreGames ? gradle.event("MORE_GAMES") : (e.prototype.show.call(this), this.clearTweens(), this.background.alpha = 0, this.game.add.tween(this.background).to({
					alpha: 1
				}, 300, Phaser.Easing.Circular.Out, !0, 0), this.plateContainer.alpha = 0, this.plateContainer.scale.set(0), this.game.add.tween(this.plateContainer).to({
					alpha: 1
				}, 400, Phaser.Easing.Circular.Out, !0, 100), this.game.add.tween(this.plateContainer.scale).to({
					x: 1,
					y: 1
				}, 400, Phaser.Easing.Back.Out, !0, 100), this.buttonHome.scale.set(.5), this.buttonHome.alpha = 0, this.game.add.tween(this.buttonHome).to({
					alpha: 1
				}, 350, Phaser.Easing.Cubic.Out, !0, 400), this.game.add.tween(this.buttonHome.scale).to({
					x: 1,
					y: 1
				}, 350, Phaser.Easing.Back.Out, !0, 400), gradle.event("SCREEN_CREDITS"))
			}, i.prototype.clearTweens = function() {
				this.game.tweens.removeFrom(this.background), this.game.tweens.removeFrom(this.plateContainer), this.game.tweens.removeFrom(this.plateContainer.scale)
			}, i.prototype.hide = function() {
				this.clearTweens(), e.prototype.hide.call(this)
			}, i.prototype.homeClicked = function() {
				this.game.sound.play("click", .9), this.hide()
			}, i
		}(t.BaseWindow);
		t.CreditsWindow = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return e.call(this, t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 240) || this
			}
			return __extends(i, e), i.prototype.buildContent = function() {
				e.prototype.buildContent.call(this), this.heartbeatSound = this.game.add.sound("defeat_heartbeat", .9, !1), this.defeatCrossLeft = this.content.add(this.game.make.sprite(this.registrationPoint.x - 15, this.registrationPoint.y - 280, t.Settings.UI_ATLAS, "defeatCrossLeft0000")), this.defeatCrossLeft.anchor.set(.5), this.defeatCrossLeft.angle = -60, this.defeatCrossLeftAnimation = this.defeatCrossLeft.animations.add("crossAnimation", Phaser.Animation.generateFrameNames("defeatCrossLeft", 0, 8, "", 4)), this.defeatCrossRight = this.content.add(this.game.make.sprite(this.registrationPoint.x, this.registrationPoint.y - 300, t.Settings.UI_ATLAS, "defeatCrossRight0000")), this.defeatCrossRight.anchor.set(.5), this.defeatCrossRight.angle = 60, this.defeatCrossRightAnimation = this.defeatCrossRight.animations.add("crossAnimation", Phaser.Animation.generateFrameNames("defeatCrossRight", 0, 6, "", 4)), this.totemHead = this.content.add(this.game.make.sprite(this.registrationPoint.x, this.registrationPoint.y - 285, t.Settings.UI_ATLAS, "defeatTotem0000")), this.totemHead.anchor.set(.5), this.buttonsContainer = this.content.add(this.game.make.group(null)), this.buttonsContainer.position.copyFrom(this.registrationPoint), this.buttonsFrame = this.buttonsContainer.add(this.game.make.sprite(0, 0, t.Settings.UI_ATLAS, "pauseFrame0000")), this.buttonsFrame.anchor.set(.5), this.buttonHome = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonHomeGray", -162, 0, this.homeClicked, this)), this.buttonRestart = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonRestartRed", 0, 0, this.restartClicked, this)), this.buttonSoundOn = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonSoundOnGray", 162, 0, this.soundOnClicked, this)), this.buttonSoundOff = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonSoundOffGray", 162, 0, this.soundOffClicked, this))
			}, i.prototype.show = function() {
				var i = this;
				e.prototype.show.call(this), gradle.event("SCREEN_LEVELRESULT"), this.buttonHome.visible = !1, this.buttonRestart.visible = !1, this.buttonSoundOn.visible = !1, this.buttonSoundOff.visible = !1, this.buttonsContainer.visible = !1, t.PlayerStatisticsCollector.instance.loses[t.Settings.CURRENT_LEVEL] += 1, t.SoundController.instance.chokeMusicVolume(), this.clearTweens(), this.buttonsContainer.alpha = 0, this.buttonsContainer.scale.set(0), this.totemHead.alpha = 0, this.background.alpha = 0, this.game.add.tween(this.background).to({
					alpha: 1
				}, 800, Phaser.Easing.Circular.Out, !0, 0), this.game.time.events.add(500, (function() {
					return i.defeatCrossLeftAnimation.play(20, !1).onComplete.add((function() {
						return i.defeatCrossRightAnimation.play(15, !1)
					}))
				})), this.game.add.tween(this.buttonsContainer).to({
					alpha: 1
				}, 350, Phaser.Easing.Circular.Out, !0, 1600), this.game.add.tween(this.buttonsContainer.scale).to({
					x: 1,
					y: 1
				}, 350, Phaser.Easing.Back.Out, !0, 1600), this.game.add.tween(this.totemHead).to({
					alpha: 1
				}, 350, Phaser.Easing.Linear.None, !0, 2100).onComplete.add((function() {
					return i.startTotemHeadAnimations()
				})), this.game.time.events.add(360, (function() {
					return i.game.sound.play("swish_left", .9)
				})), this.game.time.events.add(820, (function() {
					return i.game.sound.play("swish_right", .9)
				}))
			}, i.prototype.startTotemHeadAnimations = function() {
				var e = this;
				this.game.tweens.removeFrom(this.totemHead.scale);
				var i = this.game.add.tween(this.totemHead.scale).to({
						x: 1.12,
						y: 1.12
					}, 210, Phaser.Easing.Back.Out, !0, 0),
					n = this.game.add.tween(this.totemHead.scale).to({
						x: 1.16,
						y: 1.16
					}, 210, Phaser.Easing.Back.InOut, !1, 0),
					a = this.game.add.tween(this.totemHead.scale).to({
						x: 1,
						y: 1
					}, 1100, Phaser.Easing.Linear.None, !1, 0);
				i.chain(n), n.chain(a), a.chain(i), i.onStart.add((function() {
					return e.heartbeatSound.play()
				}));
				var s = function() {
					this.buttonsContainer.visible = !0, this.buttonHome.visible = !0, this.buttonRestart.visible = !0, this.unlockButtons(this.buttonHome, this.buttonRestart, this.buttonSoundOn, this.buttonSoundOff), this.updateSoundButtons()
				}.bind(this);
				setTimeout((function() {
					Promise.all([gradle.event("EVENT_LEVELFAIL", {
						levelName: "" + t.Settings.CURRENT_LEVEL,
						reason: "dead"
					})]).then(s, s)
				}), 1500)
			}, i.prototype.clearTweens = function() {
				this.defeatCrossLeftAnimation.stop(!0), this.defeatCrossRightAnimation.stop(!0), this.game.tweens.removeFrom(this.background), this.game.tweens.removeFrom(this.buttonsContainer), this.game.tweens.removeFrom(this.buttonsContainer.scale), this.game.tweens.removeFrom(this.totemHead.scale)
			}, i.prototype.hide = function() {
				t.SoundController.instance.restoreMusicVolume(), e.prototype.hide.call(this), this.clearTweens()
			}, i.prototype.homeClicked = function() {
				var e = this;
				this.lockUpButtons(this.buttonHome, this.buttonRestart, this.buttonSoundOn, this.buttonSoundOff), this.game.sound.play("click", .9), t.WindowManager.instance.transitionTo("MainMenu", (function() {
					return e.hide()
				})), t.App.instance.showAd(50)
			}, i.prototype.restartClicked = function() {
				var e = this;
				this.lockUpButtons(this.buttonHome, this.buttonRestart, this.buttonSoundOn, this.buttonSoundOff), this.game.sound.play("click", .9), t.WindowManager.instance.transitionTo("Level", (function() {
					return e.hide()
				})), gradle.event("EVENT_LEVELRESTART", {
					levelName: "" + t.Settings.CURRENT_LEVEL
				}), t.App.instance.showAd(50)
			}, i.prototype.soundOnClicked = function() {
				this.game.sound.mute = !0, this.updateSoundButtons(), this.game.sound.play("click", .9), gradle.event("EVENT_VOLUMECHANGE", {
					bgmVolume: 0,
					sfxVolume: 0
				}), localStorage.setItem("muted", !0)
			}, i.prototype.soundOffClicked = function() {
				this.game.sound.mute = !1, this.updateSoundButtons(), this.game.sound.play("click", .9), gradle.event("EVENT_VOLUMECHANGE", {
					bgmVolume: 1,
					sfxVolume: 1
				}), localStorage.removeItem("muted")
			}, i.prototype.updateSoundButtons = function() {
				this.game.sound.mute ? (this.buttonSoundOn.visible = !1, this.buttonSoundOff.visible = !0) : (this.buttonSoundOn.visible = !0, this.buttonSoundOff.visible = !1)
			}, i
		}(t.BaseWindow);
		t.DefeatWindow = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return e.call(this, t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 240) || this
			}
			return __extends(i, e), i.prototype.buildContent = function() {
				e.prototype.buildContent.call(this), this.sandClock = this.content.add(this.game.make.sprite(this.registrationPoint.x, this.registrationPoint.y - 290, t.Settings.UI_ATLAS, "sandClock0000")), this.sandClock.scale.set(1.3), this.sandClock.anchor.set(.5), this.buttonsContainer = this.content.add(this.game.make.group(null)), this.buttonsContainer.position.copyFrom(this.registrationPoint), this.buttonsFrame = this.buttonsContainer.add(this.game.make.sprite(0, 0, t.Settings.UI_ATLAS, "pauseFrame0000")), this.buttonsFrame.anchor.set(.5), this.buttonHome = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonHomeGray", -162, 0, this.homeClicked, this)), this.buttonResume = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonResumeYellow", 0, 0, this.resumeClicked, this)), this.buttonSoundOn = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonSoundOnGray", 162, 0, this.soundOnClicked, this)), this.buttonSoundOff = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonSoundOffGray", 162, 0, this.soundOffClicked, this)), this.buttonResumeShining = this.buttonsContainer.add(this.game.make.sprite(0, 0, t.Settings.UI_ATLAS, "buttonShining0000")), this.buttonResumeShining.anchor.set(.5), this.buttonResumeShining.scale.set(2), this.buttonResumeShining.angle = 45, this.buttonResumeShining.animations.add("shining", Phaser.Animation.generateFrameNames("buttonShining", 0, 99, "", 4).concat(Phaser.Animation.generateFrameNames("buttonShining", 0, 99, "", 4).reverse())), this.buttonResumeShining.animations.play("shining", 60, !0)
			}, i.prototype.show = function() {
				e.prototype.show.call(this), this.unlockButtons(this.buttonHome, this.buttonResume, this.buttonSoundOn, this.buttonSoundOff), t.SoundController.instance.chokeMusicVolume(), this.updateSoundButtons(), this.clearTweens(), this.buttonsContainer.alpha = 0, this.buttonsContainer.scale.set(0), this.background.alpha = 0, this.game.add.tween(this.background).to({
					alpha: 1
				}, 300, Phaser.Easing.Circular.Out, !0, 0), this.game.add.tween(this.buttonsContainer).to({
					alpha: 1
				}, 200, Phaser.Easing.Circular.Out, !0, 100), this.game.add.tween(this.buttonsContainer.scale).to({
					x: 1,
					y: 1
				}, 200, Phaser.Easing.Back.Out, !0, 100), this.sandClock.scale.set(0), this.game.add.tween(this.sandClock.scale).to({
					x: 1.3,
					y: 1.3
				}, 200, Phaser.Easing.Sinusoidal.InOut, !0, 100).onComplete.add(this.startSandClockShakingAnimation, this), gradle.event("SCREEN_PAUSE"), t.App.instance.showAd(50)
			}, i.prototype.startSandClockShakingAnimation = function() {
				this.sandClock.scale.set(1.3), this.game.add.tween(this.sandClock.scale).to({
					x: 1.2,
					y: 1.2
				}, 1900, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0);
				var t = this.game.add.tween(this.sandClock).to({
						rotation: Phaser.Math.degToRad(5)
					}, 50, Phaser.Easing.Sinusoidal.InOut, !0, 0, 2, !0),
					e = this.game.add.tween(this.sandClock).to({}, 1500, Phaser.Easing.Linear.None, !1, 0);
				t.chain(e), e.chain(t)
			}, i.prototype.clearTweens = function() {
				this.game.tweens.removeFrom(this.background), this.game.tweens.removeFrom(this.buttonsContainer), this.game.tweens.removeFrom(this.buttonsContainer.scale), this.game.tweens.removeFrom(this.sandClock), this.game.tweens.removeFrom(this.sandClock.scale)
			}, i.prototype.hide = function() {
				t.SoundController.instance.restoreMusicVolume(), this.clearTweens(), e.prototype.hide.call(this)
			}, i.prototype.homeClicked = function() {
				var e = this;
				this.lockUpButtons(this.buttonHome, this.buttonResume, this.buttonSoundOn, this.buttonSoundOff), this.game.sound.play("click", .9), t.WindowManager.instance.transitionTo("MainMenu", (function() {
					return e.hide()
				})), setTimeout((function() {
					gradle.event("EVENT_LEVELFAIL", {
						levelName: "" + t.Settings.CURRENT_LEVEL,
						reason: "quit"
					})
				}), 100), t.App.instance.showAd(50)
			}, i.prototype.resumeClicked = function() {
				this.game.sound.play("click", .9), this.hide(), this.game.state.getCurrentState() instanceof t.Level && this.game.state.getCurrentState().gameStateManager.resumeLevel(), t.App.instance.showAd(50)
			}, i.prototype.soundOnClicked = function() {
				this.game.sound.mute = !0, this.updateSoundButtons(), this.game.sound.play("click", .9), gradle.event("EVENT_VOLUMECHANGE", {
					bgmVolume: 0,
					sfxVolume: 0
				}), localStorage.setItem("muted", !0)
			}, i.prototype.soundOffClicked = function() {
				this.game.sound.mute = !1, this.updateSoundButtons(), this.game.sound.play("click", .9), gradle.event("EVENT_VOLUMECHANGE", {
					bgmVolume: 1,
					sfxVolume: 1
				}), localStorage.removeItem("muted")
			}, i.prototype.updateSoundButtons = function() {
				this.game.sound.mute ? (this.buttonSoundOn.visible = !1, this.buttonSoundOff.visible = !0) : (this.buttonSoundOn.visible = !0, this.buttonSoundOff.visible = !1)
			}, i
		}(t.BaseWindow);
		t.PauseWindow = e
	}(src || (src = {})),
	function(t) {
		var e = function(e) {
			function i() {
				return e.call(this, t.CustomScaleManager.ORIGINAL_WIDTH / 2, t.CustomScaleManager.ORIGINAL_HEIGHT / 2 + 240, .9) || this
			}
			return __extends(i, e), i.prototype.buildContent = function() {
				e.prototype.buildContent.call(this), this.mainContainer = this.content.add(this.game.make.group(null)), this.mainContainer.position.copyFrom(this.registrationPoint), this.buildButtons(), this.buildTotem(), this.buildBoard()
			}, i.prototype.buildButtons = function() {
				this.buttonsContainer = this.mainContainer.add(this.game.make.group(null)), this.buttonsFrame = this.buttonsContainer.add(this.game.make.sprite(0, 0, t.Settings.UI_ATLAS, "resultsFrame0000")), this.buttonsFrame.anchor.set(.5), this.buttonHome = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonHomeGray", -162, 13, this.homeClicked, this)), this.buttonNext = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonNextYellow", 1, 13, this.nextClicked, this)), this.buttonRestart = this.buttonsContainer.add(t.ButtonUtils.createButton(t.Settings.UI_ATLAS, "buttonRestartGray", 162, 13, this.restartClicked, this)), this.buttonNextShining = this.buttonsContainer.add(this.game.make.sprite(0, 13, t.Settings.UI_ATLAS, "buttonShining0000")), this.buttonNextShining.anchor.set(.5), this.buttonNextShining.scale.set(2), this.buttonNextShining.angle = 45, this.buttonNextShining.animations.add("shining", Phaser.Animation.generateFrameNames("buttonShining", 0, 99, "", 4).concat(Phaser.Animation.generateFrameNames("buttonShining", 0, 99, "", 4).reverse())), this.buttonNextShining.animations.play("shining", 60, !0), this.buttonNext.visible = !1, this.buttonHome.visible = !1, this.buttonRestart.visible = !1, this.buttonNextShining.visible = !1
			}, i.prototype.buildBoard = function() {
				var e = this;
				this.boardContainer = this.mainContainer.add(this.game.make.group(null)), this.boardContainer.position.set(0, -217), this.fireLeft = this.boardContainer.add(this.game.make.sprite(-195, -10, t.Settings.FX_ATLAS, "fire0000")), this.fireLeft.anchor.set(.5, 1), this.fireLeftStartAnimation = this.fireLeft.animations.add("fireStart", Phaser.Animation.generateFrameNames("fire", 0, 59, "", 4), 40, !1), this.fireLeftCycledAnimation = this.fireLeft.animations.add("fire", Phaser.Animation.generateFrameNames("fire", 60, 64, "", 4).concat(Phaser.Animation.generateFrameNames("fire", 39, 59, "", 4)), 40, !0), this.fireLeftStartAnimation.onComplete.add((function() {
					return e.fireLeftCycledAnimation.play()
				})), this.monkeyLeft = this.boardContainer.add(this.game.make.sprite(-197, 138, t.Settings.UI_ATLAS, "monkeyTotem0000")), this.monkeyLeft.anchor.set(.5, 1), this.fireRight = this.boardContainer.add(this.game.make.sprite(200, -10, t.Settings.FX_ATLAS, "fire0000")), this.fireRight.anchor.set(.5, 1), this.fireRightStartAnimation = this.fireRight.animations.add("fireStart", Phaser.Animation.generateFrameNames("fire", 0, 59, "", 4), 40, !1), this.fireRightCycledAnimation = this.fireRight.animations.add("fire", Phaser.Animation.generateFrameNames("fire", 60, 64, "", 4).concat(Phaser.Animation.generateFrameNames("fire", 39, 59, "", 4)), 40, !0), this.fireRightStartAnimation.onComplete.add((function() {
					return e.fireRightCycledAnimation.play()
				})), this.monkeyRight = this.boardContainer.add(this.game.make.sprite(197, 138, t.Settings.UI_ATLAS, "monkeyTotem0000")), this.monkeyRight.anchor.set(.5, 1), this.torchStartSound = this.game.add.sound("torch_start", 1), this.torchLoopSound = this.game.add.sound("torch_loop", 1, !0), this.board = this.boardContainer.add(new t.ResultsBoard)
			}, i.prototype.buildTotem = function() {
				this.totemContainer = this.mainContainer.add(this.game.make.group(null)), this.totemContainer.position.set(0, -374), this.leafsAnimation = this.totemContainer.add(new t.LeafsAnimation(0, 0)), this.feathersAnimation = this.totemContainer.add(new t.FeathersAnimation(0, 0)), this.monkeyTop = this.totemContainer.add(this.game.make.sprite(0, 0, t.Settings.UI_ATLAS, "resultsTotem0000")), this.monkeyTop.anchor.set(.5, 1)
			}, i.prototype.show = function() {
				var i = this;
				e.prototype.show.call(this), this.unlockButtons(this.buttonHome, this.buttonNext, this.buttonRestart), t.SoundController.instance.chokeMusicVolume(100), this.game.sound.play("victory", .8), this.clearTweens(), this.mainContainer.alpha = 0, this.mainContainer.scale.set(.7), this.background.alpha = 0, this.totemContainer.visible = !1, this.game.add.tween(this.background).to({
					alpha: 1
				}, 500, Phaser.Easing.Circular.Out, !0, 0), this.game.add.tween(this.mainContainer).to({
					alpha: 1
				}, 400, Phaser.Easing.Exponential.Out, !0, 400), this.game.add.tween(this.mainContainer.scale).to({
					x: 1,
					y: 1
				}, 400, Phaser.Easing.Back.Out, !0, 400).onComplete.add(this.startTweens, this), this.board.show((function() {
					return i.burnFire()
				}), [this.buttonNext, this.buttonHome, this.buttonRestart, this.buttonNextShining])
			}, i.prototype.startTweens = function() {
				this.totemContainer.visible = !0, this.game.add.tween(this.totemContainer).to({
					y: -374
				}, 500, Phaser.Easing.Cubic.Out, !0, 0), this.monkeyTop.scale.y = 1.01, this.game.add.tween(this.monkeyTop.scale).to({
					y: 1
				}, 200, Phaser.Easing.Linear.None, !0, 500), this.leafsAnimation.startTweens(), this.feathersAnimation.startTweens()
			}, i.prototype.burnFire = function() {
				this.fireLeft.visible = !0, this.fireRight.visible = !0, this.fireLeftStartAnimation.restart(), this.fireRightStartAnimation.restart(), this.torchStartSound.play(), this.torchLoopSound.play()
			}, i.prototype.clearTweens = function() {
				this.game.tweens.removeFrom(this.background), this.game.tweens.removeFrom(this.mainContainer), this.game.tweens.removeFrom(this.mainContainer.scale), this.game.tweens.removeFrom(this.totemContainer), this.game.tweens.removeFrom(this.monkeyTop.scale), this.fireLeft.visible = !1, this.fireRight.visible = !1, this.fireLeftStartAnimation.stop(!0), this.fireRightStartAnimation.stop(!0), this.totemContainer.y = -180
			}, i.prototype.hide = function() {
				t.SoundController.instance.restoreMusicVolume(), this.torchStartSound.stop(), this.torchLoopSound.stop(), this.clearTweens(), this.board.hide(), e.prototype.hide.call(this)
			}, i.prototype.homeClicked = function() {
				var e = this;
				this.lockUpButtons(this.buttonHome, this.buttonNext, this.buttonRestart), this.game.sound.play("click", .9), t.WindowManager.instance.transitionTo("MainMenu", (function() {
					return e.hide()
				})), t.App.instance.showAd(50)
			}, i.prototype.nextClicked = function() {
				var e = this;
				this.lockUpButtons(this.buttonHome, this.buttonNext, this.buttonRestart), this.game.sound.play("click", .9), t.Settings.CURRENT_LEVEL < t.Settings.TOTAL_LEVELS ? (t.LevelManager.instance.loadLevel(t.Settings.CURRENT_LEVEL + 1), t.WindowManager.instance.transitionTo("Level", (function() {
					return e.hide()
				}))) : t.WindowManager.instance.transitionTo("MainMenu", (function() {
					return e.hide()
				})), t.App.instance.showAd(50)
			}, i.prototype.restartClicked = function() {
				var e = this;
				this.lockUpButtons(this.buttonHome, this.buttonNext, this.buttonRestart), this.game.sound.play("click", .9), t.WindowManager.instance.transitionTo("Level", (function() {
					return e.hide()
				})), gradle.event("EVENT_LEVELRESTART", {
					levelName: "" + t.Settings.CURRENT_LEVEL
				}), t.App.instance.showAd(50)
			}, i
		}(t.BaseWindow);
		t.ResultsWindow = e
	}(src || (src = {}));