// Copyright 2017-2020 @polkadot/app-tech-comm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AccountId, Hash } from '@polkadot/types/interfaces';

import BN from 'bn.js';
import React, { useState } from 'react';
import { Button, Modal, TxButton, VoteAccount } from '@polkadot/react-components';
import { useAccounts, useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

interface Props {
  hash: Hash | string;
  prime?: AccountId | null;
  proposalId: BN | number;
}

function Voting ({ hash, prime, proposalId }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { hasAccounts } = useAccounts();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isVotingOpen, toggleVoting] = useToggle();

  if (!hasAccounts) {
    return null;
  }

  const isPrime = accountId === prime?.toString();

  return (
    <>
      {isVotingOpen && (
        <Modal
          header={t<string>('Vote on proposal')}
          size='small'
        >
          <Modal.Content>
            <VoteAccount onChange={setAccountId} />
            {isPrime && (
              <article className='warning'>
                <div>{t<string>('You are voting with this collective\'s prime account. The vote will be the default outcome in case of any abstentions.')}</div>
              </article>
            )}
          </Modal.Content>
          <Modal.Actions onCancel={toggleVoting}>
            <TxButton
              accountId={accountId}
              icon='ban'
              label={t<string>('Vote Nay')}
              onStart={toggleVoting}
              params={[hash, proposalId, false]}
              tx='technicalCommittee.vote'
            />
            <TxButton
              accountId={accountId}
              icon='check'
              label={t<string>('Vote Aye')}
              onStart={toggleVoting}
              params={[hash, proposalId, true]}
              tx='technicalCommittee.vote'
            />
          </Modal.Actions>
        </Modal>
      )}
      <Button
        icon='check'
        label={t<string>('Vote')}
        onClick={toggleVoting}
      />
    </>
  );
}

export default React.memo(Voting);
