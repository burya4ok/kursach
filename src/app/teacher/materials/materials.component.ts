import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {MaterialsService} from "../../services/materials.service";
import {CustomIconsService} from "../../services/customIcons.service";

@Component({
    selector: 'app-materials',
    templateUrl: 'materials.component.html',
    styleUrls: ['materials.component.css'],

})
export class TeacherMaterialsComponent implements OnInit {
    win: Electron.BrowserWindow;
    materials: any;
    dataGridData: any;

    constructor(private loginService: LoginService, private materialsService: MaterialsService,
    private customIcons: CustomIconsService) {
        this.dataGridData = {
            dataSource: {
                load: () => {
                    return this.materialsService.getAllMaterials()
                },
                insert: (data) => {
                    return this.materialsService.insertMaterial(data)
                },
                update: (data, updated) => {
                    return this.materialsService.updateMaterial(updated)

                },
                remove: (data) => {
                    return this.materialsService.deleteMaterial(data.id)

                },
                totalCount: () => {
                    return this.materialsService.getAllMaterials().length

                }
            },
            columns: [
                {
                    dataField: "title",
                    caption: 'Назва',
                    alignment: "center"
                },
                {
                    dataField: "unit",
                    caption: 'Блок',
                    alignment: "center"
                },
                {
                    dataField: "type",
                    caption: 'Тип',
                    alignment: "center"
                },
                {
                    dataField: "file",
                    caption: 'Файл',
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

    ngOnInit() {
        this.loginService.setTitle('Навчальний матеріал');
    }
}
