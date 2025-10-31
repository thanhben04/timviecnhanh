import { forEach } from 'lodash';

const formatClassName = (className: string) => {
    return className.replace(/([A-Z])/g, '-$1').toLowerCase();
};

const cls = (
    ...classes: Array<
        string | undefined | boolean | { [key: string]: boolean | undefined }
    >
) => {
    const classList = classes.reduce((acc: string[], cur) => {
        if (typeof cur === 'string') {
            acc.push(cur);
        } else if (typeof cur === 'object') {
            forEach(cur, (value, key) => {
                if (value) {
                    acc.push(formatClassName(key));
                }
            });
        }
        return acc;
    }, [] as string[]);
    return classList.join(' ');
};

export default cls;
