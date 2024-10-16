import * as vscode from "vscode";

// Function to wrap selected code in a function declaration
function wrapSelectionInFunction(
  editor: vscode.TextEditor,
  selection: vscode.Selection,
) {
  const selectedText = editor.document.getText(selection);
  const functionName = "my_lambda"; 

  // Construct the function declaration
  const functionCode = `
  const auto ${functionName} = [&]() {
    ${selectedText}
  };
  `;

  // Replace the selected text with the function code
  editor.edit((editBuilder) => {
    editBuilder.replace(selection, functionCode);
  });
}

function wrapSelectionInConstant(
  editor: vscode.TextEditor,
  selection: vscode.Selection,
) {
  const selectedText = editor.document.getText(selection);
  const constantName = "kMyConstant"; 

  // Construct the function declaration
  const functionCode = `
  constexpr auto ${constantName} = ${selectedText};
  `;

  // Replace the selected text with the function code
  editor.edit((editBuilder) => {
    editBuilder.replace(selection, functionCode);
  });
}

export function activate(context: vscode.ExtensionContext) {

  const function1 = vscode.commands.registerCommand(
    "myextension.wrapSelectionInFunction",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;
        wrapSelectionInFunction(editor, selection);
      } else {
        vscode.window.showErrorMessage("No active editor found.");
      }
    },
  );

  const shortcut1 = vscode.commands.registerCommand(
    "myextension.wrapSelectionInFunctionShortcut",
    () => {
      vscode.commands.executeCommand("myextension.wrapSelectionInFunction");
    },
  );

  context.subscriptions.push(function1, shortcut1);
  
  const function2 = vscode.commands.registerCommand(
    "myextension.wrapSelectionInConstant",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;
        wrapSelectionInConstant(editor, selection);
      } else {
        vscode.window.showErrorMessage("No active editor found.");
      }
    },
  );

  const shortcut2 = vscode.commands.registerCommand(
    "myextension.wrapSelectionInConstantShortcut",
    () => {
      vscode.commands.executeCommand("myextension.wrapSelectionInConstant");
    },
  );

  context.subscriptions.push(function2, shortcut2);
}

export function deactivate() {}
