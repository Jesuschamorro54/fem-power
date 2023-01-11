import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Pipe({ name: 'roleName' })
export class RoleName implements PipeTransform {
    transform(role: string): string {

        if (!role) return ''

        switch (role.toLocaleLowerCase()) {
            case "natural":
                return "Mujer Rural";
            case "fundation":
                return "Fundación";
            case "company":
                return "Empresa";
            default:
                return "Mujer Rural"
        }
    }
}

@Pipe({ name: 'userClassName' })
export class UserClassName implements PipeTransform {
    transform(role: string): string {

        if (!role) return ''

        switch (role.toLocaleLowerCase()) {
            case "natural":
                return "Mujer Rural";
            case "fundation":
                return "Fundación";
            case "company":
                return "Empresa";
            default:
                return "Mujer Rural"
        }
    }
}


@Pipe({ name: 'cutUserName' })
export class CutUserNamePipe implements PipeTransform {
    transform(username: string, length: string): string {

        username = username.toLocaleLowerCase();

        let split_username_length = username.trim().split(/\s+/).length;
        var un = username.split(' ');
        switch (length) {
            case '1':
                var user_name = un[0];
                break;
            case '2':
                var user_name = split_username_length < 3 ? username : split_username_length == 3 ? (un[0] + ' ' + un[1]) : (un[0] + ' ' + un[2]);
                break;
        }
        let name = '';

        user_name.split(' ').forEach(U => {
            name += (U.charAt(0).toUpperCase() + U.slice(1)) + ' ';
        });

        return name;

    }
}


@Pipe({ name: 'notificationsDate' })
export class notificationsDate implements PipeTransform {
    transform(_date: string): string {
        var today: any = new Date();
        var yesterday = "";
        var dd = String(today.getDate()).padStart(2, '0');
        var dd1 = String(today.getDate() - 1).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        yesterday = yyyy + '-' + mm + '-' + dd1;

        if (_date.substring(0, 10) == today) {
            return 'Hoy';
        } else if (_date.substring(0, 10) == yesterday) {
            return 'Ayer';
        } else {
            var monthNames = [
                "Ene", "Feb", "Mar",
                "Abr", "May", "Jun", "Jul",
                "Ago", "Sep", "Oct",
                "Nov", "Dic"
            ];
            return parseInt(_date.substring(8, 10)) + ' ' + monthNames[parseInt(_date.substring(5, 7)) - 1];
        }
    }
}

@Pipe({ name: 'messageDate' })
export class messageDate implements PipeTransform {
    transform(_date: string): string {
        if (_date == null) { return ''; }
        var today: any = new Date();
        var yesterday = "";
        var dd = String(today.getDate()).padStart(2, '0');
        var dd1 = String(today.getDate() - 1).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        yesterday = yyyy + '-' + mm + '-' + dd1;


        if (_date.substring(0, 10) == today) {
            return 'Hoy';
        } else if (_date.substring(0, 10) == yesterday) {
            return 'Ayer';
        } else {
            var monthNames = [
                "Ene", "Feb", "Mar",
                "Abr", "May", "Jun", "Jul",
                "Ago", "Sep", "Oct",
                "Nov", "Dic"
            ];

            return parseInt(_date.substring(8, 10)) + ' ' + monthNames[parseInt(_date.substring(5, 7)) - 1];
        }
    }
}


@Pipe({ name: 'toLowerCase' })
export class ToLowerCase implements PipeTransform {
    transform(text: string): string {
        return text.toLowerCase();
    }
}