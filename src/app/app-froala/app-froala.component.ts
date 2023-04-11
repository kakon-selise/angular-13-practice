import { Component, OnInit } from '@angular/core';

// Load WIRISplugins.js dynamically
const jsDemoImagesTransform = document.createElement("script");
jsDemoImagesTransform.type = "text/javascript";
jsDemoImagesTransform.src =
  "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image";
// Load generated scripts.
document.head.appendChild(jsDemoImagesTransform);

@Component({
  selector: 'app-app-froala',
  templateUrl: './app-froala.component.html',
  styleUrls: ['./app-froala.component.scss']
})
export class AppFroalaComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

  // Set App Title.
  title = "Angular froala demo";

  // Initialize the editor content.
  public content: string =
    '<p class="text"> Double click on the following formula to edit it.</p><p style="text-align: center;"><math><mi>z</mi><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>&PlusMinus;</mo><msqrt><msup><mi>b</mi><mn>3</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math></p>';

  // Set options for the editor.
  public options: Object = {
   // Define the toolbar options for the froala editor.
   toolbarButtons: [
     'undo',
     'redo',
     'bold',
     'italic',
     '|',
     'wirisEditor',
     'wirisChemistry',
     'insertImage'
   ],
   // Add [MW] uttons to the image editing popup Toolbar.
   imageEditButtons: [
     'wirisEditor',
     'wirisChemistry',
     'imageDisplay',
     'imageAlign',
     'imageInfo',
     'imageRemove'
   ],
   // Allow all the tags to understand the mathml
   htmlAllowedTags:  ['.*'],
   htmlAllowedAttrs: ['.*'],
   // List of tags that are not removed when they have no content inside
   // so that formulas renderize propertly
   htmlAllowedEmptyTags: ['mprescripts', 'none'],
   // In case you are using a different Froala editor language than default,
   // language: 'es',
   // You can choose the language for the MathType editor, too:
   // @see: https://docs.wiris.com/en/mathtype/mathtype_web/sdk-api/parameters#regional_properties
   // mathTypeParameters: {
   //   editorParameters: { language: 'es' },
   // },
  };

}
