import {Component, ViewChild, ElementRef} from '@angular/core';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import {FileHandle} from "./drag-drop.directive";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    files: FileHandle[] = [];
    @ViewChild('container', {static: false}) container;
    @ViewChild('canvas', {static: false}) canvas: ElementRef;
    name = 'Angular';

    helo() {
        function filter(node) {
            return (node.tagName !== 'i');
        }

        htmlToImage.toPng(document.getElementById("node"))
            .then(function (dataUrl) {
                download(dataUrl, 'my-node.png');
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }

    onFileDropped($event): void {
        this.prepareFilesList($event);
    }

    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: FileHandle[]) {
        for (const item of files) {

            this.files.push(item);
        }
    }

    deleteImage(fileToBeDeleted: FileHandle){
        this.files = this.files.filter(a =>  a.url != fileToBeDeleted.url)
    }




}
