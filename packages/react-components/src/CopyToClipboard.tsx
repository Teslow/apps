// Copyright 2017-2020 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, {useCallback} from 'react';
import {Icon} from '@polkadot/react-components';
import useToast from '@polkadot/react-hooks/useToast';

interface CopyButtonProps {
  elementId: string;
  className?: string;
}

function onCopy(id: string) {
  const content = document.getElementById(id);
  if (content instanceof HTMLInputElement) {
    content.select();
    document.execCommand('copy');
  } else {
    throw Error(`Element (#${id}) does not exist`);
  }
}

function CopyToClipboard ({elementId, className}: CopyButtonProps) {
  const { show } = useToast();
  const _onCopy = useCallback((id: string): void => {
    onCopy(id);
    show('Copied');
  }, [show]);

  return (
    <button className={className} onClick={() => _onCopy(elementId)}>
      <Icon icon="copy"/>
      Copy to clipboard
    </button>
  )
}

export default React.memo(CopyToClipboard);
