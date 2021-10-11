import { FunctionalComponent, h, VNode } from '@stencil/core';
import type { KupDom } from '../../utils/kup-manager/kup-manager-declarations';
import { FButtonProps, FButtonStyling } from './f-button-declarations';
import { FImage } from '../f-image/f-image';
import { FImageProps } from '../f-image/f-image-declarations';

const dom: KupDom = document.documentElement as KupDom;

/*-------------------------------------------------*/
/*                C o m p o n e n t                */
/*-------------------------------------------------*/

export const FButton: FunctionalComponent<FButtonProps> = (
    props: FButtonProps
) => {
    if (!props.styling) {
        props.styling = FButtonStyling.RAISED;
    }
    if (!props.label && !props.icon) {
        return;
    }
    const isIconButton: boolean = !!(
        props.styling.toLowerCase() === FButtonStyling.ICON ||
        (props.styling.toLowerCase() === FButtonStyling.RAISED &&
            props.icon &&
            (props.label === null || props.label === undefined))
    );
    return (
        <div
            class={`f-button--wrapper ${
                props.fullHeight ? 'kup-full-height' : ''
            } ${props.fullWidth ? 'kup-full-width' : ''} ${
                props.large ? 'kup-large' : ''
            } ${props.pulsating ? 'kup-pulsating' : ''}  ${
                props.shaped ? 'kup-shaped' : ''
            } ${props.slim ? 'kup-slim' : ''} ${
                props.wrapperClass ? props.wrapperClass : ''
            }`}
            part="kup-button"
            {...props.dataSet}
            id={props.id}
            title={props.title}
        >
            {isIconButton ? renderIconButton(props) : renderButton(props)}
        </div>
    );
};

/*-------------------------------------------------*/
/*                  M e t h o d s                  */
/*-------------------------------------------------*/

function renderButton(props: FButtonProps): VNode {
    const isFlat: boolean = props.styling.toLowerCase() === FButtonStyling.FLAT;
    const isFloating: boolean =
        props.styling.toLowerCase() === FButtonStyling.FLOATING;
    const isIcon: boolean = props.styling.toLowerCase() === FButtonStyling.ICON;
    const isOutlined: boolean =
        props.styling.toLowerCase() === FButtonStyling.OUTLINED;
    const isRaised: boolean =
        !isFlat && !isFloating && !isOutlined && !isIcon ? true : false;

    const propsFImage: FImageProps = {
        color: props.disabled
            ? `var(--kup-button_disabled-color)`
            : isOutlined || isFlat
            ? `var(--kup-button_primary-color)`
            : `var(--kup-button_text-on-primary-color)`,
        resource: props.icon,
        sizeX: isFloating ? '1.75em' : '1.475em',
        sizeY: isFloating ? '1.75em' : '1.475em',
        wrapperClass: 'button__icon icon-container material-icons',
    };
    if(props.showSpinner)
        propsFImage.wrapperClass += ' content--hidden'

    const classObj: Record<string, boolean> = {
        button: true,
        'button--disabled': props.disabled ? true : false,
        'button--floating': isFloating ? true : false,
        'button--outlined': isOutlined ? true : false,
        'button--raised': isRaised ? true : false,
        'button--no-label': !props.label || props.label === ' ' ? true : false,
        'button__spinner--active': props.showSpinner && !props.disabled ? true : false
    };

    const classLabelObj: Record<string, boolean> = {
        'button__label': true,
        'content--hidden': props.showSpinner && !props.disabled ? true : false
    }

    const styleSpinnerContainer: Record<string, string> = {
        "--kup-button_spinner-height": propsFImage.sizeY
    };

    return (
        <button
            type="button"
            class={classObj}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.trailingIcon
                ? [
                        <span class={classLabelObj}>{props.label}</span>,
                        props.icon ? <FImage {...propsFImage} /> : undefined
                ]
                : [
                        props.icon ? <FImage {...propsFImage} /> : undefined,
                        <span class={classLabelObj}>{props.label}</span>,
                ]}            
            {props.showSpinner && !props.disabled
                ? <div class="button__spinnercontainer" style={styleSpinnerContainer}><slot name="spinner"></slot></div>
                : undefined
            }
        </button>
    );
}

function renderIconButton(props: FButtonProps): VNode {
    const propsFImage: FImageProps = {
        color: props.disabled
            ? `var(--kup-button_disabled-color)`
            : `var(--kup-button_primary-color)`,
        sizeX: props.large ? 'calc(1.75em * 1.5)' : '1.75em',
        sizeY: props.large ? 'calc(1.75em * 1.5)' : '1.75em',
    };

    const classObj: Record<string, boolean> = {
        'icon-button': true,
        'button--disabled': props.disabled ? true : false,
        'icon-button--on': props.toggable && props.checked ? true : false,
        toggable: props.toggable ? true : false,
        'button__spinner--active': props.showSpinner && !props.disabled ? true : false
    };

    const styleSpinnerContainer: Record<string, string> = {
        "--kup-button_spinner-height": propsFImage.sizeY,
        "--kup-button_spinner-width": propsFImage.sizeX
    };

    const iconOff: string = props.iconOff
        ? props.iconOff
        : props.icon + '_border';

    return (
        <button
            type="button"
            class={classObj}
            disabled={props.disabled}
            onClick={props.onClick}
            value={props.checked ? 'on' : 'off'}
        >
            {!props.showSpinner || props.disabled
                ?   <FImage
                        {...propsFImage}
                        resource={
                            props.toggable && !props.checked ? iconOff : props.icon
                        }
                        wrapperClass={`icon-button__icon icon-container material-icons`}
                    /> : null}
            {props.toggable && !props.showSpinner ? (
                <FImage
                    {...propsFImage}
                    resource={props.icon}
                    wrapperClass={`icon-button__icon icon-button__icon--on icon-container material-icons`}
                />
            ) : null}
            {props.showSpinner && !props.disabled
                ? <div class="icon-button__spinnercontainer" style={styleSpinnerContainer}><slot name="spinner"></slot></div>
                : undefined
            }
        </button>
    );
}
