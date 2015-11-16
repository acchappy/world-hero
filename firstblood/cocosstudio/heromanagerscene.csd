<GameProjectFile>
  <PropertyGroup Type="Scene" Name="heromanagerscene" ID="1a337af1-c563-458a-9ed4-1e1946464583" Version="2.3.2.3" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Scene" Tag="3" ctype="GameNodeObjectData">
        <Size X="960.0000" Y="640.0000" />
        <Children>
          <AbstractNodeData Name="Image_bg" ActionTag="895353030" Tag="27" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="-32.0000" RightMargin="-32.0000" TopMargin="11.9760" BottomMargin="14.0240" Scale9Width="1024" Scale9Height="615" ctype="ImageViewObjectData">
            <Size X="1024.0000" Y="614.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="480.0000" Y="321.0240" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5016" />
            <PreSize X="1.0667" Y="0.9594" />
            <FileData Type="Normal" Path="background/bg3.jpg" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="hm_LayerName" ActionTag="-1819369804" Tag="118" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" RightMargin="773.0000" BottomMargin="595.0000" ctype="SpriteObjectData">
            <Size X="187.0000" Y="45.0000" />
            <AnchorPoint ScaleY="1.0000" />
            <Position Y="640.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition Y="1.0000" />
            <PreSize X="0.1948" Y="0.0703" />
            <FileData Type="Normal" Path="heromanagerscene/hm_layername.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="ScrollView_hm" ActionTag="-1201661650" Tag="31" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="50.5000" RightMargin="50.5000" TopMargin="62.5000" BottomMargin="62.5000" TouchEnable="True" ClipAble="True" BackColorAlpha="90" ColorAngle="90.0000" Scale9Width="859" Scale9Height="515" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
            <Size X="859.0000" Y="515.0000" />
            <Children>
              <AbstractNodeData Name="Layout_Hero" ActionTag="-735768042" Tag="99999" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="24.4810" RightMargin="438.5190" TopMargin="24.5000" BottomMargin="676.5000" TouchEnable="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="396" Scale9Height="114" ctype="PanelObjectData">
                <Size X="396.0000" Y="114.0000" />
                <Children>
                  <AbstractNodeData Name="Image_hm_heroIcon" ActionTag="-480203215" Tag="114" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="9.9844" RightMargin="292.0156" TopMargin="9.5000" BottomMargin="9.5000" TouchEnable="True" Scale9Width="94" Scale9Height="95" ctype="ImageViewObjectData">
                    <Size X="94.0000" Y="95.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="56.9844" Y="57.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1439" Y="0.5000" />
                    <PreSize X="0.2374" Y="0.8333" />
                    <FileData Type="Normal" Path="heromanagerscene/hm_heroicon.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_hm_heroFighting" ActionTag="-780798733" Tag="115" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="114.0248" RightMargin="213.9752" TopMargin="72.0034" BottomMargin="19.9966" Scale9Width="68" Scale9Height="22" ctype="ImageViewObjectData">
                    <Size X="68.0000" Y="22.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="148.0248" Y="30.9966" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.3738" Y="0.2719" />
                    <PreSize X="0.1717" Y="0.1930" />
                    <FileData Type="Normal" Path="heromanagerscene/hm_layerfighting.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_hm_heroAttribute" ActionTag="-1586995967" Tag="116" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="112.0560" RightMargin="241.9440" TopMargin="25.0044" BottomMargin="64.9956" Scale9Width="42" Scale9Height="24" ctype="ImageViewObjectData">
                    <Size X="42.0000" Y="24.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="133.0560" Y="76.9956" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.3360" Y="0.6754" />
                    <PreSize X="0.1061" Y="0.2105" />
                    <FileData Type="Normal" Path="heromanagerscene/hm_layerheroattribute.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Button_hm_equipage" ActionTag="-385851998" Tag="112" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="286.0160" RightMargin="11.9840" TopMargin="12.0048" BottomMargin="65.9952" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="68" Scale9Height="14" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="98.0000" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="335.0160" Y="83.9952" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8460" Y="0.7368" />
                    <PreSize X="0.2475" Y="0.3158" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                    <NormalFileData Type="Normal" Path="heromanagerscene/hm_layerequipagebtn.png" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Button_hm_intensify" ActionTag="-21345257" Tag="113" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="286.0160" RightMargin="11.9840" TopMargin="65.9952" BottomMargin="12.0048" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="68" Scale9Height="14" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="98.0000" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="335.0160" Y="30.0048" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8460" Y="0.2632" />
                    <PreSize X="0.2475" Y="0.3158" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                    <NormalFileData Type="Normal" Path="heromanagerscene/hm_layerintensifybtn.png" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_hm_heroName" ActionTag="336030447" Tag="110" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="187.8000" RightMargin="148.2000" TopMargin="25.3400" BottomMargin="68.6600" IsCustomSize="True" FontSize="20" LabelText="草稚京123456" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="120.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="217.8000" Y="78.6600" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5500" Y="0.6900" />
                    <PreSize X="0.2525" Y="0.1754" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_hm_heroFightValue" ActionTag="-778782606" Tag="113" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="211.6800" RightMargin="148.3200" TopMargin="71.7900" BottomMargin="18.2100" FontSize="24" LabelText="5000000" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="84.0000" Y="24.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="229.6800" Y="30.2100" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5800" Y="0.2650" />
                    <PreSize X="0.0758" Y="0.1754" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="LoadingBar_collection" ActionTag="311965617" Tag="137" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="111.0200" RightMargin="114.9800" TopMargin="70.3700" BottomMargin="23.6300" ctype="LoadingBarObjectData">
                    <Size X="170.0000" Y="20.0000" />
                    <Children>
                      <AbstractNodeData Name="Label_loadingBar" ActionTag="-1951751592" Tag="138" IconVisible="False" LeftMargin="32.5695" RightMargin="72.4305" TopMargin="-9.2436" BottomMargin="-6.7564" LabelText="7 / 10" ctype="TextBMFontObjectData">
                        <Size X="65.0000" Y="36.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="65.0695" Y="11.2436" />
                        <Scale ScaleX="0.8967" ScaleY="0.5957" />
                        <CColor A="255" R="255" G="0" B="0" />
                        <PrePosition X="0.3828" Y="0.5622" />
                        <PreSize X="0.0000" Y="0.0000" />
                        <LabelBMFontFile_CNB Type="Default" Path="Default/defaultBMFont.fnt" Plist="" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="196.0200" Y="33.6300" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4950" Y="0.2950" />
                    <PreSize X="0.4293" Y="0.1754" />
                    <ImageFileData Type="Default" Path="Default/LoadingBarFile.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Button_hm_summon" ActionTag="494421501" Tag="290" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="285.0160" RightMargin="10.9840" TopMargin="65.9952" BottomMargin="12.0048" TouchEnable="True" FontSize="14" ButtonText="召唤" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="16" Scale9Height="14" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="100.0000" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="335.0160" Y="30.0048" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8460" Y="0.2632" />
                    <PreSize X="0.2525" Y="0.3158" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                    <PressedFileData Type="Default" Path="Default/Button_Press.png" Plist="" />
                    <NormalFileData Type="Default" Path="Default/Button_Normal.png" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Button_hm_source" ActionTag="-1770256572" Tag="136" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="286.0160" RightMargin="11.9840" TopMargin="65.9952" BottomMargin="12.0048" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="68" Scale9Height="14" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="98.0000" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="335.0160" Y="30.0048" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8460" Y="0.2632" />
                    <PreSize X="2.1304" Y="0.7826" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                    <NormalFileData Type="Normal" Path="heromanagerscene/hm_sourcebtn.png" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="222.4810" Y="733.5000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2590" Y="0.9000" />
                <PreSize X="0.4610" Y="0.1399" />
                <FileData Type="Normal" Path="heromanagerscene/hm_herobackground.png" Plist="" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="Sprite_hm_nothaveheros" ActionTag="-704337050" Tag="999999" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="171.0000" RightMargin="171.0000" TopMargin="155.6830" BottomMargin="631.3170" ctype="SpriteObjectData">
                <Size X="517.0000" Y="28.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="429.5000" Y="645.3170" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.7918" />
                <PreSize X="0.5319" Y="0.0344" />
                <FileData Type="Normal" Path="heromanagerscene/hm_nothaveheros.png" Plist="" />
                <BlendFunc Src="770" Dst="771" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="480.0000" Y="320.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.8948" Y="0.8047" />
            <FileData Type="Normal" Path="heromanagerscene/hm_layerbackground.png" Plist="" />
            <SingleColor A="255" R="255" G="150" B="100" />
            <FirstColor A="255" R="255" G="150" B="100" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
            <InnerNodeSize Width="859" Height="815" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameProjectFile>