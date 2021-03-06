var EnterExitHooks = (function () {
    function EnterExitHooks(transition) {
        this.transition = transition;
    }
    EnterExitHooks.prototype.registerHooks = function () {
        this.registerOnEnterHooks();
        this.registerOnRetainHooks();
        this.registerOnExitHooks();
    };
    EnterExitHooks.prototype.registerOnEnterHooks = function () {
        var _this = this;
        var onEnterRegistration = function (state) { return _this.transition.onEnter({ to: state.name }, state.onEnter); };
        this.transition.entering().filter(function (state) { return !!state.onEnter; }).forEach(onEnterRegistration);
    };
    EnterExitHooks.prototype.registerOnRetainHooks = function () {
        var _this = this;
        var onRetainRegistration = function (state) { return _this.transition.onRetain({}, state.onRetain); };
        this.transition.retained().filter(function (state) { return !!state.onRetain; }).forEach(onRetainRegistration);
    };
    EnterExitHooks.prototype.registerOnExitHooks = function () {
        var _this = this;
        var onExitRegistration = function (state) { return _this.transition.onExit({ from: state.name }, state.onExit); };
        this.transition.exiting().filter(function (state) { return !!state.onExit; }).forEach(onExitRegistration);
    };
    return EnterExitHooks;
})();
exports.EnterExitHooks = EnterExitHooks;
//# sourceMappingURL=enterExitHooks.js.map