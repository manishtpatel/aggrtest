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
var data = require("./loadData");
exports.runTests = function (db) { return __awaiter(_this, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.collection(data.COLLECTION_RESPONSES).aggregate([
                    // {
                    //     $match: { bucket: 'a' },
                    // },
                    // {
                    //     $sort: { sort: 1 },
                    // },
                    // {
                    //     $skip: 1
                    // },
                    // {
                    //     $sortByCount: "$bucket",
                    // },
                    // {
                    //     $project : {
                    //         numValue: 1,
                    //         _id: 0
                    //     }
                    // },
                    // { $out: "outputCollection" }
                    {
                        $lookup: {
                            from: data.COLLECTION_PEERGROUPS,
                            localField: "key",
                            foreignField: "key",
                            as: "foundPeerGroups"
                        }
                    }
                ], {
                    explain: false
                }).toArray()];
            case 1:
                dataArray = _a.sent();
                console.log('test', dataArray);
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkFxQ0M7O0FBcENELGlDQUFrQztBQUVyQixRQUFBLFFBQVEsR0FBRyxVQUFPLEVBQVk7Ozs7b0JBQ3ZCLHFCQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsU0FBUyxDQUFDO29CQUNyRSxJQUFJO29CQUNKLCtCQUErQjtvQkFDL0IsS0FBSztvQkFDTCxJQUFJO29CQUNKLDBCQUEwQjtvQkFDMUIsS0FBSztvQkFDTCxJQUFJO29CQUNKLGVBQWU7b0JBQ2YsS0FBSztvQkFDTCxJQUFJO29CQUNKLCtCQUErQjtvQkFDL0IsS0FBSztvQkFDTCxJQUFJO29CQUNKLG1CQUFtQjtvQkFDbkIsdUJBQXVCO29CQUN2QixpQkFBaUI7b0JBQ2pCLFFBQVE7b0JBQ1IsS0FBSztvQkFDTCwrQkFBK0I7b0JBQy9CO3dCQUNJLE9BQU8sRUFBRTs0QkFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjs0QkFDaEMsVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLFlBQVksRUFBRSxLQUFLOzRCQUNuQixFQUFFLEVBQUUsaUJBQWlCO3lCQUN4QjtxQkFDSjtpQkFDSixFQUFDO29CQUNFLE9BQU8sRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUE7O2dCQTlCUixTQUFTLEdBQUcsU0E4Qko7Z0JBRVosT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7Ozs7S0FDakMsQ0FBQSJ9