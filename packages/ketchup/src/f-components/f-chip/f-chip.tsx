import { FunctionalComponent, h, VNode } from '@stencil/core';
import { FChipsProps, FChipType } from '../f-chip/f-chip-declarations';
import { FImage } from '../f-image/f-image';
import { FImageProps } from '../f-image/f-image-declarations';
import {
    KupThemeColorValues,
    KupThemeIconValues,
} from '../../managers/kup-theme/kup-theme-declarations';
import { KupDataDataset } from '../../managers/kup-data/kup-data-declarations';
import { KupChipNode } from '../../components/kup-chip/kup-chip-declarations';
import { KupDom } from '../../managers/kup-manager/kup-manager-declarations';

const dom: KupDom = document.documentElement as KupDom;

/*-------------------------------------------------*/
/*                C o m p o n e n t                */
/*-------------------------------------------------*/

export const FChip: FunctionalComponent<FChipsProps> = (props: FChipsProps) => {
    if (!props.type) {
        props.type = FChipType.STANDARD;
    }

    const isChoice = props.type.toLowerCase() === FChipType.CHOICE;
    const isFilter = props.type.toLowerCase() === FChipType.FILTER;
    const isInput = props.type.toLowerCase() === FChipType.INPUT;
    const classObj: Record<string, boolean> = {
        'chip-set': true,
        'chip-set--choice': isChoice ? true : false,
        'chip-set--filter': isFilter ? true : false,
        'chip-set--input': isInput ? true : false,
    };

    return (
        <div
            class={`f-chip ${props.danger ? 'kup-danger' : ''} ${
                props.info ? 'kup-info' : ''
            } ${props.secondary ? 'kup-secondary' : ''} ${
                props.success ? 'kup-success' : ''
            } ${props.warning ? 'kup-warning' : ''} ${
                props.wrapperClass ? props.wrapperClass : ''
            }`}
            {...props.dataSet}
            id={props.id}
            title={props.title}
        >
            <div class={classObj} role="grid">
                {createChipList(props, isChoice, isFilter, isInput)}
            </div>
        </div>
    );
};

/*-------------------------------------------------*/
/*                  M e t h o d s                  */
/*-------------------------------------------------*/

function createChipList(
    props: FChipsProps,
    isChoice: boolean,
    isFilter: boolean,
    isInput: boolean
): VNode[] {
    const chipList: VNode[] = [];

    if ((props.data as KupDataDataset).columns) {
        const data = props.data as KupDataDataset;
        props.data = dom.ketchup.data.datasetOperations.row.toNode(data);
    }

    for (let i = 0; props.data && i < props.data.length; i++) {
        const chipGroup: VNode[] = [];
        recursive(props.data[i], 0);
        chipList.push(<div class="chip-set__item">{...chipGroup}</div>);

        function recursive(chip: KupChipNode, indent: number) {
            chipGroup.push(createChip(chip, indent));
            if (chip.children && chip.children.length > 0) {
                for (let index = 0; index < chip.children.length; index++) {
                    if (chip.children[index]) {
                        recursive(chip.children[index], indent + 1);
                    }
                }
            }
        }

        function createChip(chip: KupChipNode, indent: number): VNode {
            let componentClass: string = `chip ${
                indent > 0 ? 'chip--is-child' : ''
            }`;
            let iconEl = [];
            let iconClass = 'chip__icon chip__icon--leading';

            if (!chip.label) {
                chip.label = chip.value;
            }

            if (isFilter || isChoice) {
                if (chip.checked) {
                    componentClass += ' chip--selected';
                    if (isFilter) {
                        iconClass += ' chip__icon--leading-hidden';
                    }
                }
            }

            if (chip.icon) {
                const p: FImageProps = {
                    color:
                        isChoice && chip.checked
                            ? `var(${KupThemeColorValues.PRIMARY})`
                            : `var(${KupThemeColorValues.TEXT})`,
                    resource: chip.icon,
                    sizeX: '18px',
                    sizeY: '18px',
                    wrapperClass: iconClass,
                };
                iconEl.push(<FImage {...p} />);
            }

            if (isFilter) {
                iconEl.push(
                    <span class="chip__checkmark">
                        <svg class="chip__checkmark-svg" viewBox="-2 -3 30 30">
                            <path
                                class="chip__checkmark-path"
                                fill="none"
                                stroke="black"
                                d="M1.73,12.91 8.1,19.28 22.79,4.59"
                            />
                        </svg>
                    </span>
                );
            }

            const indentStyle = {
                ['--kup_chip_indent_offset']: indent.toString(),
            };

            return (
                <div
                    class={componentClass}
                    data-value={chip.value}
                    onClick={
                        props.onClick && props.onClick[i]
                            ? props.onClick[i].bind(props.onClick[i], chip)
                            : null
                    }
                    role="row"
                    style={indentStyle}
                    title={chip.title ? chip.title : ''}
                >
                    {iconEl}
                    <span role="gridcell">
                        <span
                            role="button"
                            tabindex={i}
                            class="chip__primary-action"
                            // @ts-ignore
                            value={chip.value}
                            checked={chip.checked}
                            onBlur={
                                props.onBlur && props.onBlur[i]
                                    ? props.onBlur[i].bind(
                                          props.onBlur[i],
                                          chip
                                      )
                                    : null
                            }
                            onFocus={
                                props.onFocus && props.onFocus[i]
                                    ? props.onFocus[i].bind(
                                          props.onFocus[i],
                                          chip
                                      )
                                    : null
                            }
                        >
                            <span class="chip__text">{chip.label}</span>
                        </span>
                    </span>
                    {isInput ? (
                        <span role="gridcell">
                            <span
                                tabindex="-1"
                                class={`kup-icon chip__icon ${KupThemeIconValues.CLEAR.replace(
                                    '--',
                                    ''
                                )}`}
                                onClick={
                                    props.onIconClick && props.onIconClick[i]
                                        ? props.onIconClick[i].bind(
                                              props.onIconClick[i],
                                              chip
                                          )
                                        : null
                                }
                            ></span>
                        </span>
                    ) : null}
                </div>
            );
        }
    }

    return chipList;
}
