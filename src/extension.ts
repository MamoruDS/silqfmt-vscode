import * as vscode from 'vscode'
import * as utils from './utils'
import { formatter } from './formatter'
import { writeFileSync, unlinkSync } from 'fs'

export function activate(context: vscode.ExtensionContext) {
    vscode.languages.registerDocumentFormattingEditProvider('silq', {
        async provideDocumentFormattingEdits(
            document: vscode.TextDocument,
            options: vscode.FormattingOptions
        ): Promise<vscode.TextEdit[]> {
            const pos_start = document.lineAt(0).range.start
            const pos_end = document.lineAt(document.lineCount - 1).range.end

            let code: string = document.getText()
            const filepath =
                utils.getExtensionPath() + '/temp' + Date.now() + '.slq'

            writeFileSync(filepath, code)

            try {
                code = await formatter(filepath, options)
            } catch (e) {
                throw e
            } finally {
                unlinkSync(filepath)
            }

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
