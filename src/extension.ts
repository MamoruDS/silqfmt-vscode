import * as vscode from 'vscode'
import { formatter } from './formatter'

export function activate(context: vscode.ExtensionContext) {
    vscode.languages.registerDocumentFormattingEditProvider('silq', {
        async provideDocumentFormattingEdits(
            document: vscode.TextDocument,
            options: vscode.FormattingOptions
        ): Promise<vscode.TextEdit[]> {
            const pos_start = document.lineAt(0).range.start
            const pos_end = document.lineAt(document.lineCount - 1).range.end

            const code: string = await formatter(document.uri.fsPath, options)

            return [
                vscode.TextEdit.replace(
                    new vscode.Range(pos_start, pos_end),
                    code
                ),
            ]
        },
    })
}

export function deactivate() {}
