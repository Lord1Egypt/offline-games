/**
 * input-adapter.js — Universal Keyboard + Mouse Adapter for HTML5 Games
 * 
 * Bridges mouse clicks and keyboard presses to simulated touch events.
 * Makes mobile-only HTML5 games playable on desktop.
 * 
 * Features:
 * - Touch capability shim (games detect touch support)
 * - Mouse clicks → proper touch events (targeted via elementFromPoint)
 * - Arrow keys / WASD → directional swipes from center
 * - Space / Enter → tap at center
 * - Number keys 1-9 → tap at grid positions
 * - Escape → back gesture
 * - Works with Construct 3, Phaser, CreateJS, Cocos2d, etc.
 */

(function() {
    'use strict';

    if (window.__inputAdapterInstalled) return;
    window.__inputAdapterInstalled = true;

    // ─── Touch capability shim ───
    if (!('ontouchstart' in window)) {
        window.ontouchstart = function() {};
    }
    if (!navigator.maxTouchPoints) {
        try {
            Object.defineProperty(navigator, 'maxTouchPoints', {
                get: function() { return 1; },
                configurable: true
            });
        } catch(e) {}
    }

    // ─── Touch event simulation ───
    function createTouchEvent(type, x, y, target) {
        try {
            var touch = new Touch({
                identifier: Date.now() + Math.random() * 10000,
                target: target,
                clientX: x, clientY: y,
                screenX: x, screenY: y,
                pageX: x, pageY: y,
                radiusX: 2.5, radiusY: 2.5,
                force: 1
            });
            
            return new TouchEvent(type, {
                cancelable: true, bubbles: true,
                touches: type === 'touchend' ? [] : [touch],
                targetTouches: type === 'touchend' ? [] : [touch],
                changedTouches: [touch]
            });
        } catch(e) {
            return null;
        }
    }

    function simulateTouch(type, x, y) {
        // Find the actual element at this position
        var target = document.elementFromPoint(x, y);
        if (!target) target = document.body;
        
        var evt = createTouchEvent(type, x, y, target);
        if (evt) {
            target.dispatchEvent(evt);
            // Also dispatch on document for broader coverage
            document.dispatchEvent(evt);
        }
    }

    // ─── Mouse → Touch Bridge ───
    var isTouchDevice = ('ontouchstart' in window) && navigator.maxTouchPoints > 0;

    document.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        simulateTouch('touchstart', e.clientX, e.clientY);
    }, true);
    
    document.addEventListener('mouseup', function(e) {
        if (e.button !== 0) return;
        simulateTouch('touchend', e.clientX, e.clientY);
    }, true);
    
    document.addEventListener('mousemove', function(e) {
        if (e.buttons > 0) {
            simulateTouch('touchmove', e.clientX, e.clientY);
        }
    }, true);

    // ─── Keyboard → Touch ───
    function getCenter() {
        return {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
    }

    document.addEventListener('keydown', function(e) {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) {
            return;
        }
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        
        var key = e.key;
        var center = getCenter();
        var handled = true;

        switch (key) {
            case 'ArrowUp': case 'w': case 'W':
                simulateTouch('touchstart', center.x, center.y);
                setTimeout(function() {
                    simulateTouch('touchend', center.x, center.y - 200);
                }, 40);
                break;

            case 'ArrowDown': case 's': case 'S':
                simulateTouch('touchstart', center.x, center.y);
                setTimeout(function() {
                    simulateTouch('touchend', center.x, center.y + 200);
                }, 40);
                break;

            case 'ArrowLeft': case 'a': case 'A':
                simulateTouch('touchstart', center.x, center.y);
                setTimeout(function() {
                    simulateTouch('touchend', center.x - 200, center.y);
                }, 40);
                break;

            case 'ArrowRight': case 'd': case 'D':
                simulateTouch('touchstart', center.x, center.y);
                setTimeout(function() {
                    simulateTouch('touchend', center.x + 200, center.y);
                }, 40);
                break;

            case ' ': case 'Enter':
                simulateTouch('touchstart', center.x, center.y);
                setTimeout(function() {
                    simulateTouch('touchend', center.x, center.y);
                }, 20);
                break;

            case 'Escape':
                simulateTouch('touchstart', center.x, 50);
                setTimeout(function() {
                    simulateTouch('touchend', center.x, center.y * 1.5);
                }, 80);
                break;

            case '1': case '2': case '3':
            case '4': case '5': case '6':
            case '7': case '8': case '9':
                var num = parseInt(key) - 1;
                var tx = (window.innerWidth / 3) * ((num % 3) + 0.5);
                var ty = (window.innerHeight / 3) * (Math.floor(num / 3) + 0.5);
                simulateTouch('touchstart', tx, ty);
                setTimeout(function() {
                    simulateTouch('touchend', tx, ty);
                }, 20);
                break;

            case 'r': case 'R':
                simulateTouch('touchstart', center.x, center.y);
                setTimeout(function() {
                    simulateTouch('touchend', center.x, center.y);
                }, 500);
                break;

            default:
                handled = false;
        }

        if (handled) {
            e.preventDefault();
        }
    });

    console.log('[InputAdapter] ✓ Desktop input adapter ready');
})();
