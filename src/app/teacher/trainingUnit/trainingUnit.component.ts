import {Component, OnInit} from '@angular/core';
import {TrainingUnitService} from "../../services/trainingUnit.service";
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
                load: (loadOptions) => {
                    return this.trainingUnitService.getTrainingUnits(loadOptions)
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
                    return this.trainingUnitService.countTrainingUnits()
                }
            },
            filterRow: {
                applyFilter: "auto",
                applyFilterText: "Apply filter",
                betweenEndText: "End",
                betweenStartText: "Start",
                resetOperationText: "Reset",
                showAllText: "(Всі)",
                showOperationChooser: true,
                visible: true
            },
            pager: {
                infoText: "Сторінка {0} із {1}",
                showInfo: false,
                showNavigationButtons: false,
                showPageSizeSelector: false,
                visible: "auto"
            },
            paging: {
                enabled: true,
                pageIndex: 0,
                pageSize: 6
            },
            columns: [
                {
                    dataField: "code",
                    caption: 'Шифр',
                    alignment: "center",
                    width: '30%'
                },
                {
                    dataField: "name",
                    caption: 'Назва',
                    alignment: "center",
                    width: '70%'
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