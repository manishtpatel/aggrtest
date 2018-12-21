"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
exports.COLLECTION_RESPONSES = "responses";
exports.COLLECTION_PEERGROUPS = "peergroups";
exports.loadData = function (db) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Clean slate
                db.dropCollection(exports.COLLECTION_RESPONSES);
                db.dropCollection(exports.COLLECTION_PEERGROUPS);
                // Load test data
                return [4 /*yield*/, db.collection(exports.COLLECTION_RESPONSES).insertMany(getResponsesDocs())];
            case 1:
                // Load test data
                _a.sent();
                return [4 /*yield*/, db.collection(exports.COLLECTION_PEERGROUPS).insertMany(getPeersDocs())];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getResponsesDocs = function () {
    return [
        { key: '1', bucket: 'a', sort: '2', numValue: 10, boolValue: false },
        { key: '2', bucket: 'b', sort: '1', numValue: 20, boolValue: true },
        { key: '3', bucket: 'a', sort: '3', numValue: 30, boolValue: true },
    ];
};
var getPeersDocs = function () {
    return [
        { key: '1', peer: "p1", entry: 1 },
        { key: '2', peer: "p1", entry: 2 },
        { key: '3', peer: "p2", entry: 3 },
    ];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2FkRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkE2QkM7O0FBM0JZLFFBQUEsb0JBQW9CLEdBQUcsV0FBVyxDQUFBO0FBQ2xDLFFBQUEscUJBQXFCLEdBQUcsWUFBWSxDQUFBO0FBRXBDLFFBQUEsUUFBUSxHQUFHLFVBQU8sRUFBWTs7OztnQkFDdkMsY0FBYztnQkFDZCxFQUFFLENBQUMsY0FBYyxDQUFDLDRCQUFvQixDQUFDLENBQUE7Z0JBQ3ZDLEVBQUUsQ0FBQyxjQUFjLENBQUMsNkJBQXFCLENBQUMsQ0FBQTtnQkFFeEMsaUJBQWlCO2dCQUNqQixxQkFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLDRCQUFvQixDQUFDLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBQTs7Z0JBRHhFLGlCQUFpQjtnQkFDakIsU0FBd0UsQ0FBQTtnQkFDeEUscUJBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyw2QkFBcUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFBOztnQkFBckUsU0FBcUUsQ0FBQTs7OztLQUN4RSxDQUFBO0FBRUQsSUFBTSxnQkFBZ0IsR0FBRztJQUNyQixPQUFPO1FBQ0gsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUc7UUFDckUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUc7UUFDcEUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUc7S0FDdkUsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUVELElBQU0sWUFBWSxHQUFHO0lBQ2pCLE9BQU87UUFDSCxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1FBQ2xDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7UUFDbEMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtLQUNyQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBIn0=