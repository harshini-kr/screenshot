import {Directive, EventEmitter, HostBinding, HostListener, Inject, Optional, Output} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

export interface FileHandle {
    file: File;
    url: SafeUrl;
    name: string;
}

@Directive({
    selector: '[appDragDrop]'
})

export class DragDropDirective {
    @HostBinding('class.fileover') fileOver: boolean;
    @Output('files') files: EventEmitter<FileHandle[]> = new EventEmitter();
    constructor(@Inject(DomSanitizer) private readonly sanitizer: DomSanitizer) {}


    // Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = true;
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
    }

    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
        let files: FileHandle[] = [];
        for (let i = 0; i < evt.dataTransfer.files.length; i++) {

            const file = evt.dataTransfer.files[i];
            const name = file.name;
            const url = this.sanitizer.bypassSecurityTrustUrl(
                window.URL.createObjectURL(file)
            );
            files.push({ file, url, name });
        }
        if (files.length > 0) {
            this.files.emit(files);
        }
    }

}
