import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingUnitService} from "../../services/trainingUnit";
import {SubjectService} from "../../services/subject.service";

@Component({
    selector: 'my-app',
    templateUrl: './trainingUnit.component.html',
    styleUrls: ['./trainingUnit.component.css'],
})

export class TrainingUnitComponent implements OnInit {
    dataGridData: any;
    subject: any;
    editSubject: any;

    constructor(private trainingUnitService: TrainingUnitService, private subjectService: SubjectService) {
        this.subject = subjectService.getSubject();
        this.editSubject = subjectService.getSubject();
        this.dataGridData = {
            dataSource: {
                load: (loadOptions) => {
                    return this.trainingUnitService.getTrainingUnits()
                },
                insert: (data) => {
                    return this.trainingUnitService.insertTrainingUnits(data)
                },
                update: (data, updated) => {
                    let newVal = {
                        id: data.id,
                        code: updated.code ? updated.code: data.code,
                        name: updated.name ? updated.name: data.name
                    };
                    return this.trainingUnitService.updateTrainingUnits(newVal)

                },
                remove: (data) => {
                    return this.trainingUnitService.deleteTrainingUnits(data.id)

                },
                totalCount: (loadOptions) => {
                    return this.trainingUnitService.getTrainingUnits().length

                }
            },
            columns: [
                {
                    dataField: "code",
                    caption: 'Шифр',
                    alignment: "center",
                    editCellTemplate: function (cellElemente, options) {
                        cellElemente.height(15);
                        $('<button>' + options.value + '</button>')
                            .on('dxClick', function () {
                                alert('Open ' + options.value)
                            })
                            .appendTo(cellElemente)
                    }
                },
                {dataField: "name", caption: 'Назва', alignment: "center"},
            ],
            bindingOptions: {
                noDataText: 'Немає данних'
            },
            editing: {
                allowAdding: true,
                allowDeleting: true,
                allowUpdating: true,
                mode: "form",
                texts: {
                    addRow: "Додати блок",
                    cancelAllChanges: "Відмінити зміни",
                    cancelRowChanges: "Відмінити",
                    confirmDeleteMessage: "Ви впевненні, що хочети видалити блок?",
                    deleteRow: "Видалити",
                    editRow: "Редагувати",
                    saveAllChanges: "Зберегти зміни",
                    saveRowChanges: "Зберегти"
                }
            }
        }
    }

    onUploadError = (e) => {
        this.editSubject.path = e.file.path;
        this.editSubject.mainImg = e.file.name;
    };

    saveChanges = (): void => {
        this.subjectService.setSubject(this.editSubject);
        this.refreshData()
    };

    cancelChanges = (): void => {
        this.editSubject = this.subjectService.getSubject();
    };

    private refreshData() {
        this.editSubject = this.subjectService.getSubject();
        this.subject = this.subjectService.getSubject();
    }
    isSame = (): boolean => {
        return JSON.stringify(this.editSubject) === JSON.stringify(this.subject);
    };

    ngOnInit() {

    }
}