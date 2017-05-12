import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {MaterialsService} from "../../services/materials.service";
import {CustomIconsService} from "../../services/customIcons.service";
import {TrainingUnitService} from "../../services/trainingUnit.service";
import {AdditionalMaterialsService} from "../../services/additional-materials.service";

@Component({
    selector: 'app-additional-materials',
    templateUrl: 'additional-materials.component.html',
    styleUrls: ['additional-materials.component.css'],

})
export class TeacherAdditionalMaterialsComponent implements OnInit {
    win: Electron.BrowserWindow;
    materials: any;
    dataGridData: any;

    constructor(private loginService: LoginService, private materialsService: AdditionalMaterialsService,
                private customIcons: CustomIconsService, private unitService: TrainingUnitService) {
        this.dataGridData = {
            dataSource: {
                load: (loadOptions) => {
                    return this.materialsService.getAllMaterials(loadOptions)
                },
                insert: (data) => {
                    return this.materialsService.insertMaterial(data)
                },
                update: (data, updated) => {
                    let material = {
                        title: updated.title ? updated.title : data.title,
                        unit: updated.unit ? updated.unit : data.unit,
                        type: updated.type ? updated.type : data.type,
                        file: updated.file ? updated.file : data.file,
                        id: data.id
                    };
                    return this.materialsService.updateMaterial(material)

                },
                remove: (data) => {
                    return this.materialsService.deleteMaterial(data.id)

                },
                totalCount: () => {
                    return this.materialsService.countMaterials()

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
                pageSize: 10
            },
            columns: [
                {
                    dataField: "title",
                    caption: 'Назва',
                    alignment: "left",
                    width: '450px',
                },
                {
                    dataField: "unit",
                    caption: 'Блок',
                    alignment: "center",
                    width: '100px',
                    lookup: {
                        dataSource: this.unitService.getTrainingUnits(null),
                        valueExpr: 'code',
                        displayExpr: 'code'
                    }
                },
                {
                    dataField: "type",
                    caption: 'Тип',
                    alignment: "center",
                    width: '170px',
                    lookup: {
                        dataSource: this.materialsService.getTypes(),
                        valueExpr: 'value',
                        displayExpr: 'title'
                    }
                },
                {
                    dataField: "file",
                    caption: 'Файл',
                    alignment: "left",
                    editCellTemplate: 'fileUploader'
                },

            ],
            bindingOptions: {
                noDataText: 'Немає данних'
            },
            editing: {
                width: '50px',
                allowAdding: true,
                allowDeleting: true,
                allowUpdating: true,
                mode: "form",
                texts: {
                    addRow: "Додати",
                    cancelAllChanges: "Відмінити зміни",
                    cancelRowChanges: "Відмінити",
                    confirmDeleteMessage: "Ви впевненні, що хочети видалити?",
                    deleteRow: customIcons.remove,
                    editRow: customIcons.edit,
                    saveAllChanges: "Зберегти зміни",
                    saveRowChanges: "Зберегти"
                }
            }
        }
    }

    uploadFile(e, cell) {
        cell.setValue(e.file.path)
    }

    ngOnInit() {
        this.loginService.setTitle('Додаткові матеріали');
    }
}
