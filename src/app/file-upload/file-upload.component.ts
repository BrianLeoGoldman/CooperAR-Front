import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ProjectService} from '../services/project.service';
import {TaskService} from '../services/task.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  fileToUpload: File = null;
  entity: string;
  id: number;
  validSize: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private projectService: ProjectService,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.entity = this.route.snapshot.paramMap.get('entity');
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.validSize = false;
  }

  // tslint:disable-next-line:typedef
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.validSize = this.fileToUpload.size <= 1048576;
    console.log('Size of the file: ' + this.fileToUpload.size);
  }

  // tslint:disable-next-line:typedef
  uploadFile() {
    // TODO: duplicated code, it should be one method in a new File Service!!!
    if (this.entity === 'project'){
      this.projectService.postFile(this.fileToUpload, this.id)
        .subscribe(data => {
          this.location.back();
        }, error => {
          console.log(error.toString());
        });
    } else {
      this.taskService.postFile(this.fileToUpload, this.id)
        .subscribe(data => {
          this.location.back();
        }, error => {
          console.log(error.toString());
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
