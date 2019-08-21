"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
class Core {
}
exports.Core = Core;
class Modifiers extends Core {
    hasAbstract(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.AbstractKeyword);
    }
    hasAsync(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.AsyncKeyword);
    }
    hasConst(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.ConstKeyword);
    }
    hasDeclare(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.DeclareKeyword);
    }
    hasDefault(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.DefaultKeyword);
    }
    hasExport(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.ExportKeyword);
    }
    hasReadonly(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.ReadonlyKeyword);
    }
    hasStatic(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.StaticKeyword);
    }
    hasPublic(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.PublicKeyword);
    }
    hasPrivate(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.PrivateKeyword);
    }
    hasProtected(modifiers) {
        return modifiers.find(it => it.kind === ts.SyntaxKind.ProtectedKeyword);
    }
}
exports.Modifiers = Modifiers;
class Type extends Core {
}
exports.Type = Type;
//# sourceMappingURL=core.js.map