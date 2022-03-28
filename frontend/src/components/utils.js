export const filtrarMetrics = (data, metrics) => {
    return data?.find(elem => elem.id === metrics);
}

export const sumarTotal = (data, metrics) => {
    let sumall = 0;
    sumall = data?.map(item => item.metrics.find(elem => elem.id === metrics).value).reduce((prev, curr) => prev + curr, 0);
    return sumall;
}

export const sumarRedes = (data, redes, metrics) => {
    const filtroRedes = data?.filter(element => element.networkId === redes);
    let sumall = 0;
    sumall = filtroRedes?.map(item => item.metrics.find(elem => elem.id === metrics).value).reduce((prev, curr) => prev + curr, 0);

    return sumall
}