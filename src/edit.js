import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { Button, TextControl, Popover, Slot } from '@wordpress/components';
import { useState } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { actionAddress } = attributes;
    const [isEditing, setIsEditing] = useState(false);
    const [tempAddress, setTempAddress] = useState(actionAddress);

    const handleAddressChange = (newAddress) => {
        setTempAddress(newAddress);
    };

    const handlePopupClose = () => {
        setAttributes({ actionAddress: tempAddress });
        setIsEditing(false);
    };

    const handleSave = () => {
        setAttributes({ actionAddress: tempAddress });
        setIsEditing(false);
    };

    return (
        <div {...useBlockProps()}>
            <BlockControls>
                <Slot name="inspector-toggle-control" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        icon="admin-settings"
                        onClick={() => setIsEditing(!isEditing)}
                        aria-expanded={isEditing}
                        label="Change Action Address"
                    />
                </div>
            </BlockControls>
            {isEditing && (
                <Popover
                    position="top center"
                    onClose={handlePopupClose}
                >
                    <div style={{padding: '10px', width: '400px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} className="custom-popover-content">
                        <TextControl
                            style={{width: '300px'}}
                            value={tempAddress}
                            onChange={handleAddressChange}
                            autoFocus
                        />
                        <Button style={{border: 'solid 1px'}} onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </Popover>
            )}
            <form action={actionAddress} method="post">
                <label htmlFor="name">Name:</label>
                <br />
                <input type="text" id="name" name="name" required />
                <br />
                <br />

                <label htmlFor="email">Email:</label>
                <br />
                <input type="email" id="email" name="email" required />
                <br />
                <br />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
                <br />
                <br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export function save({ attributes }) {
    const { actionAddress } = attributes;
    return (
        <div>
            <form action={actionAddress} method="post">
                <label htmlFor="name">Name:</label>
                <br />
                <input type="text" id="name" name="name" required />
                <br />
                <br />

                <label htmlFor="email">Email:</label>
                <br />
                <input type="email" id="email" name="email" required />
                <br />
                <br />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
                <br />
                <br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

// Persist the actionAddress attribute
wp.hooks.addFilter(
    'blocks.registerBlockType',
    'my-plugin/modify-block-registration',
    (settings, name) => {
        if (name === 'namespace/blockname') {
            return lodash.assign({}, settings, {
                attributes: lodash.assign({}, settings.attributes, {
                    actionAddress: {
                        type: 'string',
                        source: 'attribute',
                        attribute: 'action',
                        selector: 'form',
                    },
                }),
            });
        }
        return settings;
    }
);
