export function calcPerc(value: number, perc: number): number {
    return Math.round((value * perc) / 100)
}

export function logs(data: any, dataName: any) {
    console.log(`${dataName}: `, data)
}