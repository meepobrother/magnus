import * as ts from "typescript";
export class Core {}
export class Modifiers extends Core {
  public hasAbstract(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.AbstractKeyword);
  }
  public hasAsync(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.AsyncKeyword);
  }
  public hasConst(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.ConstKeyword);
  }
  public hasDeclare(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.DeclareKeyword);
  }
  public hasDefault(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.DefaultKeyword);
  }
  public hasExport(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.ExportKeyword);
  }
  public hasReadonly(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.ReadonlyKeyword);
  }
  public hasStatic(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.StaticKeyword);
  }
  public hasPublic(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.PublicKeyword);
  }
  public hasPrivate(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.PrivateKeyword);
  }
  public hasProtected(modifiers: ts.ModifiersArray) {
    return modifiers.find(it => it.kind === ts.SyntaxKind.ProtectedKeyword);
  }
}
export class Type extends Core {}
