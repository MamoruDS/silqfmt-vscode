import * as vscode from 'vscode'
import * as cp from 'child_process'
import * as utils from './utils'

const getBinaryPath = (): string => {
    let built = 'x86_64-unknown-linux-gnu'
    switch (process.platform) {
        case 'darwin':
            built = 'x86_64-apple-darwin'
            break
        case 'win32':
            built = 'x86_64-pc-windows-gnu.exe'
            break
    }
    return `${utils.getExtensionPath()}/bin/silqfmt-${built}`
}

export const formatter = async (
    filepath: string,
    options: vscode.FormattingOptions
): Promise<string> => {
    const args: string[] = [
        `--input`,
        filepath,
        `--tab-size`,
        options.tabSize.toString(),
    ]
    if (!options.insertSpaces) {
        args.push('--hardtab')
    }

    const child = cp.spawnSync(getBinaryPath(), args, {
        encoding: 'utf8',
    })
    if (child.status != 0) {
        throw new Error(child.stderr)
    }
    return child.stdout
}
