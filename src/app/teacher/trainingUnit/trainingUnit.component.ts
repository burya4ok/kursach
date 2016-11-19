import {Component, OnInit} from '@angular/core';
import {TrainingUnitService} from "../../services/trainingUnit";
import {LoginService} from "../../services/login.service";
import {CustomIconsService} from "../../services/customIcons.service";

@Component({
    selector: 'my-app',
    templateUrl: './trainingUnit.component.html',
    styleUrls: ['./trainingUnit.component.css'],
})

export class TrainingUnitComponent implements OnInit {
    dataGridData: any;

    constructor(private trainingUnitService: TrainingUnitService, private loginService: LoginService,
    private customIcons: CustomIconsService) {
        this.dataGridData = {
            dataSource: {
                load: () => {
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
                totalCount: () => {
                    return this.trainingUnitService.getTrainingUnits().length

                }
            },
            columns: [
                {
                    dataField: "code",
                    caption: 'Шифр',
                    alignment: "center"
                },
                {
                    dataField: "name",
                    caption: 'Назва',
                    alignment: "center"
                },
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
                    deleteRow: customIcons.remove,
                    editRow: customIcons.edit,
                    saveAllChanges: "Зберегти зміни",
                    saveRowChanges: "Зберегти"
                }
            }
        }
    }


    ngOnInit() {
        this.loginService.setTitle('Навчальний блок');
    }
}