/**
 * NeovimEditor.ts
 *
 * IEditor implementation for Neovim
 */

import * as React from "react"

import { IncrementalDeltaRegionTracker } from "./../DeltaRegionTracker"
import { NeovimInstance } from "./../neovim"
import { INeovimRenderer } from "./../Renderer"
import { NeovimScreen } from "./../Screen"

import { ActiveWindowContainer } from "./../UI/components/ActiveWindow"
import { AutoCompletionContainer } from "./../UI/components/AutoCompletion"
import { ConnectedBufferScrollBar } from "./../UI/components/BufferScrollBar"
import { Cursor } from "./../UI/components/Cursor"
import { CursorLine } from "./../UI/components/CursorLine"
import { ErrorsContainer } from "./../UI/components/Error"
import { QuickInfoContainer, SignatureHelpContainer } from "./../UI/components/QuickInfo"

import { NeovimInput } from "./NeovimInput"
import { NeovimRenderer } from "./NeovimRenderer"

export interface INeovimSurfaceProps {
    neovimInstance: NeovimInstance
    deltaRegionTracker: IncrementalDeltaRegionTracker
    renderer: INeovimRenderer
    screen: NeovimScreen
}

export class NeovimSurface extends React.PureComponent<INeovimSurfaceProps, void> {
    public render(): JSX.Element {

        const tabBorderStyle = {
            "borderBottom": "4px solid rgb(40, 44, 52)",
        }

        return <div className="container vertical full">
            <div className="container fixed">
                <div className="tabs horizontal enable-mouse" style={tabBorderStyle}>
                    <div className="tab not-selected">
                        <div className="name">App.ts</div>
                    </div>
                    <div className="tab selected">
                        <div className="name">NeovimInstance.ts</div>
                    </div>
                    <div className="tab not-selected">
                        <div className="name">Test.ts</div>
                    </div>
                </div>
            </div>
            <div className="container full">
                <div className="stack layer">
                    <NeovimRenderer renderer={this.props.renderer}
                        neovimInstance={this.props.neovimInstance}
                        deltaRegionTracker={this.props.deltaRegionTracker} />
                </div>
                <div className="stack layer">
                    <Cursor />
                    <CursorLine lineType={"line"} />
                    <CursorLine lineType={"column"} />
                </div>
                <div className="stack layer">
                    <ActiveWindowContainer>
                        <ErrorsContainer />
                        <ConnectedBufferScrollBar />
                    </ActiveWindowContainer>
                </div>
                <NeovimInput neovimInstance={this.props.neovimInstance}
                    screen={this.props.screen} />
                <div className="stack layer">
                    <QuickInfoContainer />
                    <SignatureHelpContainer />
                    <AutoCompletionContainer />
                </div>
            </div>
        </div>
    }
}
