import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'sort',
    pure: false // (EB: for real time update => pure can be set to true)
})
export class SortPipe implements PipeTransform {
    transform(value: any, propName: string) {
        return value.sort((a,b) => {
            if (a[propName] > b[propName]) {
                return 1;
            } else {
                return -1;
            }
        });
    }

}