import NutstoreProviderLogo from '@renderer/assets/images/providers/nutstore.png'
import { useNutstoreSSO } from '@renderer/hooks/useNutstoreSSO'
import { useAppDispatch, useAppSelector } from '@renderer/store'
import { setNutstoreToken } from '@renderer/store/nutstore'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { HStack } from './Layout'

export function NutstoreLogin() {
  const { nutstoreToken } = useAppSelector((state) => state.nutstore)
  const [open, setOpen] = useState(true)
  const nutstoreSSOHandler = useNutstoreSSO()
  const dispatch = useAppDispatch()

  const handleClickNutstoreSSO = async () => {
    const ssoUrl = await window.api.nutstore.getSSOUrl()
    window.open(ssoUrl, '_blank')
    const nutstoreToken = await nutstoreSSOHandler()
    dispatch(setNutstoreToken(nutstoreToken))
    setOpen(false)
  }

  const { t } = useTranslation()

  return (
    <>
      {nutstoreToken ? (
        <Modal open={open} centered footer={null} maskClosable={false} mask width={200} closable={false}>
          <Container justifyContent="center" alignItems="center" className="test11123">
            <Button type="primary" onClick={handleClickNutstoreSSO}>
              <Logo src={NutstoreProviderLogo} />
              {t('settings.data.nutstore.login.button')}
            </Button>
          </Container>
        </Modal>
      ) : null}
    </>
  )
}

const Container = styled(HStack)`
  padding: 8px;
  gap: 4px;
`

const Logo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
